const jwt = require('jsonwebtoken')
const User = require('../models').users
exports.userMiddleware = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization
        if (!tokenHeader) return res.send(`forbidden`)
        const token = tokenHeader.split(' ')[1]
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified) return res.json({ status: 404, msg: 'Access denied' })
        const findUser = await User.findOne({ where: { id: verified.id } })
        if (!findUser) return res.json({ status: 404, msg: `Invalid accound found` })
        req.user = findUser.id
        next()
    } catch (error) {
     return res.json({status: 500, msg: error})
    }
}