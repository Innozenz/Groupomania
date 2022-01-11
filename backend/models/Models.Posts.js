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
            hooks:true
        });
        Posts.hasMany(models.Likes, {
            onDelete: "cascade",
            hooks:true
        });
        Posts.belongsTo(models.Users, { foreignKey:'UserId', onDelete: 'CASCADE', hooks:true})
    };
    return Posts;
};
