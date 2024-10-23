import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const app = express();

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'))
// })

// app.get("/kaas", (req, res) => {
//   res.send("Hello, World!");
// });

app.use(morgan("common"));
app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
  res.send({ message: `Hello ${req.body.email}` });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
