import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
// import postgres from "postgres";
import pg from "pg";
import jwt from "jsonwebtoken";
import "cookie-parser";
import authenticateToken from "./middleware/authToken.js";

const DB_NAME = "vdb";

let client = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: 123,
  port: 5432,
});

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkDuplicate = await client.query(
      `SELECT * from users where email='${email}'`
    );

    if (checkDuplicate.rowCount > 0) {
      // user found
      // check password
      // create jwt

      res.status(401).json({
        error: "Authentication failed",
      });
      return;
    }

    const newUser = await client.query(
      `INSERT INTO users(name, email, password) VALUES ('', '${email}', '${password}') RETURNING id`
    );

    const accessToken = jwt.sign({ userId: newUser.rows[0].id }, "kaas213", {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(
      {
        userId: newUser.rows[0].id,
      },
      "refreshsecret",
      {
        expiresIn: "1d",
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.post("/test", authenticateToken, (req, res) => {
  res.send({ message: "secret info" });
});

app.post("/refresh", (req, res) => {
  if (req.cookies?.jwt) {
    const refreshToken = req.cookies.jwt;
    jwt.verify(refreshToken, "refreshsecret", (err, user) => {
      if (err) {
        return res.status(401).json({
          error: "Unauthorized",
        });
      }

      const accessToken = jwt.sign(
        {
          userId: user.id,
        },
        "kaas213",
        {
          expiresIn: "10m",
        }
      );
      return res.status(200).json({ accessToken });
    });
  } else {
    return res.status(406).json({ message: "Unauthorized" });
  }
});

const port = 3000;
app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

  await client.connect();

  const res = await client.query(
    `SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`
  );

  if (res.rowCount === 0) {
    console.log(`${DB_NAME} database not found, creating it.`);
    await client.query(`CREATE DATABASE "${DB_NAME}";`);
    console.log(`created database ${DB_NAME}`);

    await client.end();

    client = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: 123,
      port: 5432,
      database: DB_NAME,
    });

    await client.connect();

    await client.query(
      `
        CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, name VARCHAR(255), password VARCHAR(255), email VARCHAR(255) );

        CREATE TABLE IF NOT EXISTS posts ( id SERIAL PRIMARY KEY, author_id INT references users(id) NOT NULL );

      `
    );
  } else {
    console.log(`${DB_NAME} database exists.`);
    await client.end();
    client = new pg.Client({
      host: "localhost",
      user: "postgres",
      password: 123,
      port: 5432,
      database: DB_NAME,
    });

    await client.connect();
  }
});
