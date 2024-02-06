const { CreateBlog, UpdateBlog, getSingleBlog, Allblogs, getUserBlogs, deleteBlog,  CommentOnBlog, LikeBlogs, DislikeBlogs } = require('../controllers/BlogControllers')
const { userMiddleware } = require('../middleware/auth')

const router = require('express').Router()
 

router.post('/create-blog', userMiddleware, CreateBlog)
router.put('/update', userMiddleware, UpdateBlog)
router.get('/single-user', userMiddleware, getUserBlogs)
router.get('/single/:id',  getSingleBlog)
router.get('/all',  Allblogs)
router.delete('/delete',userMiddleware,  deleteBlog)


// Comments, likes and dislikes
router.post('/comment', userMiddleware, CommentOnBlog)
router.post('/likes', userMiddleware, LikeBlogs)
router.post('/dislikes', userMiddleware, DislikeBlogs)


module.exports = router