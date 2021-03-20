// Load nodejs core modules
const path = require("path");

// Load npm modules
const colors = require("colors");
const config = require("config");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const morgan = require("morgan");
const xss = require("xss-clean");

// Personal module imports
const connectDB = require("./utils/database");
const errorHandler = require("./middlewares/error");

// Routes imports
const auth = require("./routes/auth");
const users = require("./routes/users");
const upload = require("./routes/uploadroute");
const comicType = require("./routes/comicType");
const comic = require("./routes/comic");
const chapter = require("./routes/chapter");
const page = require("./routes/page");
const { MAIN_PATH_UPLOAD } = require("./utils/globals");
// Load env vars
dotenv.config({
  path: "./config/config.env"
});

// Connect to database
connectDB();
const app = express();
app.use("/admin", require("./utils/admin"));
// Adding useful third party middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

console.log(
  `process.env.NODE_ENV: ${process.env.NODE_ENV}`.cyan.underline.bold
);

// Setting up morgan for request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan());
}

// Sanitize data to prevent SQL injection
app.use(mongoSanitize());

// Prevent cross site scripting attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes window
  max: 100
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routes

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/upload", upload);
app.use("/api/v1/comics_types", comicType);
app.use("/api/v1/comics", comic);
app.use("/api/v1/chapters", chapter);
app.use("/api/v1/pages", page);
app.use(express.static(MAIN_PATH_UPLOAD));

app.use(errorHandler);
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});

//Creation of pipeline for
