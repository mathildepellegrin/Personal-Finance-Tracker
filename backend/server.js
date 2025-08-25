//express app
//imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const expensesRoutes = require("./routes/expenses");
const authRoutes = require("./routes/auth");
const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Session middleware
app.use(
  session({
    secret: "supersecretkey", 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }, // 1 hour
  })
);

// Routes
app.use("/api/expenses", expensesRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});