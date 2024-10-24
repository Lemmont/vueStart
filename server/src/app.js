import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
// import postgres from "postgres";
import pg from "pg";

const DB_NAME = "vdb";

// const db_options = {
//   host: "localhost",
//   port: 5432,
//   database: "vuedb",
//   username: "postgres",
//   password: 123,
// };
let client = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: 123,
  port: 5432,
});

const app = express();

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

app.post("/register", async (req, res) => {
  // get body
  // validation etc.
  const keys = Object.keys(req.body);
  console.log(keys);

  const checkDuplicate = await client.query(
    `SELECT * from users where email='${req.body[
      keys[0]
    ].toString()}' OR name='${req.body[keys[1]].toString()}'`
  );

  if (checkDuplicate.length > 0) {
    res.send({
      message: `User ${req.body[keys[1]].toString()} with email ${req.body[
        keys[0]
      ].toString()} already exists`,
      status: 999,
    });
    return;
  }

  const newUser = await client.query(
    `INSERT INTO users(name, email, password) VALUES ('${req.body[
      keys[1]
    ].toString()}', '${req.body[keys[0]].toString()}', 'password')`
  );

  console.log(checkDuplicate);
  res.send({ message: `Hello ${newUser}` });
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

  // try {
  //   sql = postgres(db_options);
  //   // check tables
  // } catch (error) {
  //   console.error("Database connection failed", error);
  //   return;
  // } finally {
  //   console.log(
  //     `Connected to '${db_options.database}' at port '${db_options.port}'`
  //   );
  // }

  // if (sql == null) {
  //   return;
  // }
});
