import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

app.get("/", (req, res) => {
  res.json({ message: "This is the route of the root! Feeling:Happy!" });
});

const dbConnectionString = process.env.DATABASE_URL;
const db = new pg.Pool({
  connectionString: dbConnectionString,
});

app.get("/moodthing", async (req, res) => {
  const query = await db.query("SELECT * FROM moods");
  await res.json(query.rows);
});

// The code below needs to be added into the client when the form is ready to be pulled

// // const messageForm = document.querySelector("#messageForm");

// function handleSubmitMessageForm(event) {
//   event.preventDefault();
//   const formData = new FormData(messageForm);
//   const formValues = Object.fromEntries(formData);
//   fetch("http://localhost:8080/guestbookentry", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ formValues }),
//   });
//   console.log(formValues);
// }
// messageForm.addEventListener("submit", handleSubmitMessageForm);

// app.post("/guestbookentry", async (req, res) => {
//   const data = req.body.formValues;
//   const query = await db.query(
//     `INSERT INTO juicyjakesguestbook (col2, col3, col4, col5) VALUES ($1, $2, $3, $4)`,
//     [data.input1, data.input2, data.input3, data.input4]
//   );
//   await res.json(query.rows);
// });
