const express = require('express');
const cors = require('cors'); // ✅ Import cors
const app = express();

app.use(cors({
    origin: ['http://localhost:3000','https://library-management-b6ev.onrender.com','https://library-management-1-exve.onrender.com'], // ✅ allow frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
require("dotenv").config();
const dbConfig = require("./config/dbConfig");

const port = process.env.PORT || 10000;

// ✅ Import and use routes
const usersRoute = require("./routes/usersRoute");
const booksRoute = require("./routes/booksRoute");
const issuesRoute = require("./routes/issuesRoute");
const reportsRoute = require("./routes/reportsRoute");

app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);
app.use("/api/issues", issuesRoute);
app.use("/api/reports", reportsRoute);

// ✅ Serve React frontend in production
// const path = require("path");
// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "/client/build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//     });
// }

app.listen(port, () => console.log(`Server is running on port ${port}`));
