module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('blog', {
        title:{type: DataTypes.STRING},
        content: {type: DataTypes.TEXT},
        image: {type: DataTypes.STRING, allowNull: true},
        slug:{type: DataTypes.STRING},
        user: {type: DataTypes.INTEGER}
    })
}