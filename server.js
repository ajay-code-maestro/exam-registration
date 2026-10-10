const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const registrations = [];

app.post("/api/register", (req, res) => {
    const { name, rollNumber, email, course, subject } = req.body;

    if (!name || !rollNumber || !email || !course || !subject) {
        return res.status(400).json({
            message: "Please fill in all fields."
        });
    }

    const duplicate = registrations.find(
        student => student.rollNumber === rollNumber
    );

    if (duplicate) {
        return res.status(409).json({
            message: "This roll number is already registered."
        });
    }

    const registration = {
        id: registrations.length + 1,
        name,
        rollNumber,
        email,
        course,
        subject
    };

    registrations.push(registration);

    res.status(201).json({
        message: "Exam registration successful!",
        registrationId: registration.id
    });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "OK" });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Exam Registration App running on port ${PORT}`);
});
