require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");



const app = express();
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync().then(() => {
    console.log("Drop and re-sync db.");
});

// Routers

const postRouter = require("./routes/Routes.Posts");
const commentsRouter = require("./routes/Routes.Comments");
const usersRouter = require("./routes/Routes.Users");
const likesRouter = require("./routes/Routes.Likes");
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);
app.use("/likes", likesRouter);

app.use("/images", express.static("./images"));


// set port, listen for requests
const PORT = (process.env.PORT || 8080);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});




