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
  const query = await db.query("SELECT * FROM moods ORDER BY ID");
  await res.json(query.rows);
});

app.post("/moodTrackerEntry", async (req, res) => {
  const data = req.body.formValues;
  const query = await db.query(
    `INSERT INTO moods (date, mood, comment, emoji) VALUES ($1, $2, $3, $4)`,
    [data.date, data.mood, data.comment, data.emoji]
  );
  await res.json(query.rows);
});
