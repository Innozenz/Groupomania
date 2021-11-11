const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const cors = require("cors");

const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// Routers

const postRouter = require("./routes/Posts");
const commentsRouter = require("./routes/Comments");
app.use("/posts", postRouter);
app.use("/comments", commentsRouter);


// set port, listen for requests
const PORT = (process.env.PORT || 8080);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});




