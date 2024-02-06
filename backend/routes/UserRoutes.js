const { CreateAccout, getUserAccount, getAllUsers, logginAccount, getprofile, logOutUser } = require('../controllers/UserControllers')
const {  userMiddleware } = require('../middleware/auth')



const router = require('express').Router()
   
router.post('/create-account', CreateAccout)
router.get('/single/:id', getUserAccount)
router.get('/all', getAllUsers)
router.post('/login', logginAccount)
router.post('/logout',userMiddleware, logOutUser)
router.get('/get-profile', userMiddleware, getprofile)
module.exports = router