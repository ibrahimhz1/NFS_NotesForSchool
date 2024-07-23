require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { logger } = require("./middlewares/logEvents");
const credentials = require("./middlewares/credentials");
const errorMiddleware = require("./middlewares/error");

// PORT SPECS
const PORT = process.env.PORT || 3500;

// CORS OPTIONS
const corsOptions = require("./configs/corsOptions");

// middlewares
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const user = require("./routes/api/userRoutes");
const note = require("./routes/api/notesRoutes");

// routes
app.use("/", require("./routes/root"));

// API routes
app.use("/api", user);
app.use("/api", note);

// 404 routes updated
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// error handler
app.use(errorMiddleware);

// database connection
const connectDatabase = require("./configs/dbConfig");
connectDatabase();

app.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});
