module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
    });

    Posts.associate = (models) => {
        Posts.hasMany(models.Comments, {
            onDelete: "cascade",
        });
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
        });
        Posts.belongsTo(models.Users, { foreignKey:'UserId'})
    };
    return Posts;
};
