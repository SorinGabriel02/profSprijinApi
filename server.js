require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const usersRouter = require("./src/routes/usersRoutes");
const postsRouter = require("./src/routes/postsRoutes");
const commentsRouter = require("./src/routes/commentsRoutes");
const mediaRouter = require("./src/routes/mediaRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(require("morgan")("dev"));

// middleware
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: "PHP 7.4.8" }));
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/media", mediaRouter);

const port = process.env.PORT || 8080;

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) return console.log(err);
    console.log("Successfully connected to the database.");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  }
);
