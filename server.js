const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

//connect database
connectDB();

//INIT middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/menu", require("./routes/api/menu"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/orders", require("./routes/api/orders"));
app.use("/api/feedback", require("./routes/api/feedback"));
app.use("/api/orderstatus", require("./routes/api/orderStatus"));
app.use("/api/leave", require("./routes/api/leave"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
