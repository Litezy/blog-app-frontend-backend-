const {Sequelize, DataTypes} = require('sequelize')

// Create a Sequelize instance with database connection details
const sequelize = new Sequelize('blogger','root', '', {
    host: 'localhost',
    dialect:  'mysql'
})
// Test the database connection
sequelize.authenticate()
.then(() =>{console.log(`db connected successfully`)})
.catch((err) => { console.log(err)})

// Initialize an object to store Sequelize-related properties
const db ={}


// Assign the Sequelize instance to the 'sequelize' property of the 'db' object
db.sequelize = sequelize
// Assign the Sequelize library to the 'Sequelize' property of the 'db' object
db.Sequelize = Sequelize
// Register the users table model
db.users =require('./usermodel')(sequelize, DataTypes)
db.blogs = require('./blogModel')(sequelize, DataTypes)
db.comments = require('./commentModel')(sequelize, DataTypes)
db.likes = require('./likeModel')(sequelize, DataTypes)
db.dislikes = require('./dislikemodel')(sequelize, DataTypes)

db.sequelize.sync({force: false}).then(() =>{ console.log(`database tables synchronized successfuly`)})
db.users.hasMany(db.blogs, {foreignKey : 'user', as: 'bloguser'})
db.blogs.hasMany(db.comments, {foreignKey: 'blog', as: 'comments'})
db.blogs.hasMany(db.likes, {foreignKey: 'blog', as : 'likes'})
db.blogs.hasMany(db.dislikes, {foreignKey: 'blog', as : 'dislikes'})



db.blogs.belongsTo(db.users, {foreignKey: 'user', as: 'bloguser'})
db.comments.belongsTo(db.blogs, {foreignKey : 'blog', as: 'comments'})
db.likes.belongsTo(db.blogs, {foreignKey: 'blog', as: 'likes'})
db.dislikes.belongsTo(db.blogs, {foreignKey: 'blog', as : 'dislikes'})

// Synchronize the database tables (create if not exists) based on the defined models


// Export the 'db' object for use in other parts of the application
module.exports = db 