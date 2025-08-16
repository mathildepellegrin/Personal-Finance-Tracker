//express app
//imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const expensesRoutes = require("./routes/expenses");
const PORT = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/expenses", expensesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});