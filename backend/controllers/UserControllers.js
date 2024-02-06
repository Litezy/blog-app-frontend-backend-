
const User = require('../models').users
const fs = require('fs')
const slug = require('slug')
const jwt = require('jsonwebtoken')

exports.CreateAccout = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body
        // validatng input fields
        if (!username) return res.json({ status: 404, msg: 'Username is required' })
        if (!email) return res.json({ status: 404, msg: 'email is required' })
        if (!password) return res.json({ status: 404, msg: 'password is required' })
        if (password.length < 6) return res.json({ status: 404, msg: 'password must be greater than 6 letters' })
        if (!confirm_password) return res.json({ status: 404, msg: 'you must confirm your password' })
        if (confirm_password !== password) return res.json({ status: 404, msg: 'password (s) mismatched' })


        // checking if email already exists
        const findEmail = await User.findOne({ where: { email: email } })
        if (findEmail) return res.json({ status: 404, msg: 'Email already exists' })

        const findUsername = await User.findOne({ where: { username: username } })
        if (findUsername) return res.json({ status: 404, msg: `Username already in use` })
        // validate profile image existence
        if (!req.files) return res.json({ status: 404, msg: 'profile image not uploaded' })
        const Imagedata = req.files.image
        console.log('Request Body:', req.body);
        console.log('Request Files:', req.files);

        if (Imagedata.size >= 1000000) return res.json({ status: 404, msg: `File too large! expected size should be 1MB` })
        if (!Imagedata.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `Invalid image format, try uploading a valid image` })
        //create an image directory if it doesnt exist in lthe folder
        const filePath = './public/profiles'
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath)
        }

        //generate a unique name for user profile image
        const imageName = `${slug(username, '_')}.jpg`

        //Registering a user to the database
        const user = await User.create({
            image: imageName,
            username,
            email,
            password
        })
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1hr' })
        //save the image to the specified directory
        await Imagedata.mv(`${filePath}/${imageName}`)

        return res.json({ status: 201, msg: 'Account created successfully', token })



    } catch (error) {
        return res.json({ status: 404, msg: error })
    }
}

exports.getUserAccount = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user } })
        if (!user) return res.json({ status: 404, msg: `Account not found` })

        res.json({ status: 201, msg: user })
    } catch (error) {
        res.json({ status: 404, msg: (error) })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const item = await User.findAll({})
        return res.json({ status: 201, item })
    } catch (error) {
        return res.status(404).send(error)
    }

}
exports.logginAccount = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.json({ status: 404, msg: 'No email and password provided' })
        const findEmail = await User.findOne({ where: { email: email } })
        if (!findEmail) return res.json({ status: 404, msg: 'Account not found' })
        if (findEmail.password !== password) return res.json({ status: 404, msg: 'Invalid password' })
        //jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jwt.sign({ id: findEmail.id, role: findEmail.role }, process.env.JWT_SECRET, { expiresIn: "1hr" })
        return res.json({ status: 201, msg: `Logged in successfully`, token })
    } catch (error) {
        return res.json({ status: 404, msg: (error) })
    }
}
exports.getprofile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user)
        if (!user) return res.json({
            status: 404,
            msg: `Account not found`,
            param: `User ID from req.user:", ${req.user}`
        })
        return res.json({ status: 200, user: user})
    } catch (error) {
        return res.json({ status: 404, msg: (`${error}`) })
    }
}

exports.logOutUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user)
        if (!user) return res.json({
            status: 404,
            msg: `Account not found`,
            param: `User ID from req.user:", ${req.user}`
        })
        return res.json({ status: 200, msg: `Logged out successfully`})
        
    } catch (error) {
       return  res.json({status: 404, msg: error})
    }
}