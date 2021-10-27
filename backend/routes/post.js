const express = require('express');
const posts = require("../controllers/posts.js");
const router = express.Router();

module.exports = app => {


    // Create a new Tutorial
    router.post("/", posts.create);

    // Retrieve all Tutorials
    router.get("/", posts.findAll);

    // Retrieve all published Tutorials
    router.get("/published", posts.findAllPublished);

    // Retrieve a single Tutorial with id
    router.get("/:id", posts.findOne);

    // Update a Tutorial with id
    router.put("/:id", posts.update);

    // Delete a Tutorial with id
    router.delete("/:id", posts.delete);

    // Delete all Tutorials
    router.delete("/", posts.deleteAll);

    app.use('/api/posts', router);
};
