const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// ✅ These two lines must come BEFORE routes
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

// ✅ Now apply your routes
app.use("/contacts", contactRoutes);

mongoose.connect("mongodb://localhost:27017/contactdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
