module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });
    };
    return Posts;
};
