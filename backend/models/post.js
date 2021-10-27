module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        content: {
            type: Sequelize.STRING
        }
    });

    return Post;
};
