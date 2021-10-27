const express = require('express');
const comments = require("../controllers/comments");
const router = express.Router();

module.exports = app => {


    // Create a new Tutorial
    router.post("/", comments.create);

    // Retrieve all Tutorials
    router.get("/", comments.findAll);

    // Retrieve all published Tutorials
    router.get("/published", comments.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", comments.findOne);

    // Update a Tutorial with id
    router.put("/:id", comments.update);

    // Delete a Tutorial with id
    router.delete("/:id", comments.delete);

    // Delete all Tutorials
    router.delete("/", comments.deleteAll);

    app.use('/api/comments', router);
};