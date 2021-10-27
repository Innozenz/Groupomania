const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Post
exports.create = (req, res) => {
    if (!req.body.content) {
        res.status(400).send({
            message: "Content cannot be empty !"
        });
        return;
    }

    const comment = {
        content: req.body.content
    };

    Comment.create(comment)
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the post"
        });
    });
};

// Retrieve all Posts from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}`}}:null;

    Comment.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch((err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving posts."
            });
        }));
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Comment.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Comment.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
    Comment.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Posts
exports.findAllPublished = (req, res) => {
    Comment.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
