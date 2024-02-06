//configuring reuired environments to run and start up server
const env = require('dotenv')
env.config()
const express = require('express')
const http = require('http')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const port = process.env.PORT
//configuring express app
const app = express()
const server = http.createServer(app)
// parsing or telling server to use this as a means of sending responses to requests
app.use(express.json())

//enabling image uploads to the server
app.use(fileUpload())

//configuring cors to enable server listen to requests coming from localhost:5173 as it enables our backend to communicate with websites tat are parsed inside it and restrict others for security reasons
//this way we can connect our local frontend to the backend
app.use(cors({
    origin:['http://localhost:5173','http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176']
}))
//serve static files in the public folder
app.use(express.static('public'))
// using the userroutes to handle api requests from the /api
app.use('/api/user', require('./routes/UserRoutes'))
app.use('/api/blog', require('./routes/blogRoutes'))
//starting the server and listen for incoming requests
app.listen(port, () => console.log(`sever runnning on http://localhost:${port}`))