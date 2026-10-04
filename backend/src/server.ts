import express from "express";
import cors from "cors";
import { DatabaseSync } from "node:sqlite";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ================= DATABASE =================

const db = new DatabaseSync("./registrations.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        college TEXT NOT NULL,
        year TEXT NOT NULL,
        teamName TEXT NOT NULL,
        track TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

console.log("Database connected successfully!");

// ================= HOME =================

app.get("/", (req, res) => {
    res.json({
        message: "The Last Commit backend is running!"
    });
});

// ================= REGISTER =================

app.post("/api/register", (req, res) => {

    console.log("Registration received:", req.body);

    const {
        name,
        email,
        phone,
        college,
        year,
        teamName,
        track
    } = req.body;

    if (
        !name ||
        !email ||
        !phone ||
        !college ||
        !year ||
        !teamName ||
        !track
    ) {
        return res.status(400).json({
            message: "Please fill all fields."
        });
    }

    try {

        const statement = db.prepare(`
            INSERT INTO registrations
            (name, email, phone, college, year, teamName, track)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        statement.run(
            name,
            email,
            phone,
            college,
            year,
            teamName,
            track
        );

        console.log("Registration saved successfully!");

        res.json({
            message: "Registration successful! 🚀"
        });

    } catch (error) {

        console.error("DATABASE ERROR:", error);

        res.status(500).json({
            message: "Registration failed. Please try again."
        });
    }
});

// ================= ADMIN =================

app.get("/api/admin/registrations", (req, res) => {

    try {

        const registrations = db.prepare(`
            SELECT *
            FROM registrations
            ORDER BY id DESC
        `).all();

        res.json(registrations);

    } catch (error) {

        console.error("ADMIN ERROR:", error);

        res.status(500).json({
            message: "Could not load registrations"
        });
    }
});
app.get("/api/admin/registrations", (req, res) => {
    try {
        const registrations = db.prepare(`
            SELECT *
            FROM registrations
            ORDER BY id DESC
        `).all();

        res.json(registrations);
    } catch (error) {
        console.error("ADMIN ERROR:", error);

        res.status(500).json({
            message: "Could not load registrations"
        });
    }
});
// ================= SERVER =================

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});