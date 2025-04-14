const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname)));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password]);

    if (result.rows.length > 0) {
      res.json({ message: "Login successful" });
    } else {
      res.json({ message: "Incorrect username or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
