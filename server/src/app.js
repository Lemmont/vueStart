import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import postgres from "postgres";

const db_options = {
  host: "localhost",
  port: 5432,
  database: "vuedb",
  username: "postgres",
  password: 123,
};

let sql;

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

app.post("/register", async (req, res) => {
  // get body
  // validation etc.
  const keys = Object.keys(req.body);
  console.log(keys);

  const checkDuplicate = await sql`SELECT * from users where email=${req.body[
    keys[0]
  ].toString()} OR name=${req.body[keys[1]].toString()}`;

  if (checkDuplicate.length > 0) {
    res.send({
      message: `User ${req.body[keys[1]].toString()} with email ${req.body[
        keys[0]
      ].toString()} already exists`,
      status: 999,
    });
    return;
  }

  const newUser =
    await sql`INSERT INTO users(name, email, password) VALUES (${req.body[
      keys[1]
    ].toString()}, ${req.body[keys[0]].toString()}, 'password')`;

  console.log(checkDuplicate);
  res.send({ message: `Hello ${newUser}` });
});

const port = 3000;
app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  try {
    sql = postgres(db_options);
    // check tables
  } catch (error) {
    console.error("Database connection failed", error);
    return;
  } finally {
    console.log(
      `Connected to '${db_options.database}' at port '${db_options.port}'`
    );
  }

  if (sql == null) {
    return;
  }
});
