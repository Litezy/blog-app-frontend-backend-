const Blog = require('../models').blogs
const User = require('../models').users
const Comment = require('../models').comments
const Like = require('../models').likes
const Dislike = require('../models').dislikes
const fs = require('fs')
const slug = require('slug')


exports.CreateBlog = async (req, res) => {
    try {
        const { title, content } = req.body
        if (!title) return res.json({ status: 404, msg: `Title is required` })
        if (!content) return res.json({ status: 404, msg: `content is required` })

        const image = req?.files?.image
        const filepath = './public/blogs'
        const slugData = slug(title, '_')
        //   res.json({status: 200, msg: image})
        let imageName;
        if (image) {

            if (image.size >= 1000000) return res.json({ status: 404, msg: `Cannot upload image! image more than 1MB` })
            if (!image.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `Invalid image format! Formats should be in jpg, jpeg, png, avif, webp, svg, gif` })

            if (!fs.existsSync(filepath)) {
                fs.mkdirSync(filepath)
            }
            const date = new Date()
            imageName = `${slugData}-${date.getTime()}.jpg`

        }

        await Blog.create({
            title,
            content,
            image: imageName,
            slug: slugData,
            user: req.user
        })
        if (image) {
            await image.mv(`${filepath}/${imageName}`)
        }
        return res.json({ status: 200, msg: `Blog created successfully` })
    } catch (error) {
        return res.json({ status: 500, msg: error })
    }
}


exports.UpdateBlog = async (req, res) => {
    try {
        const { title, content, blogid } = req.body

        if (!title || !content || !blogid) return res.json({ status: 404, msg: `Incomplete request found` })
        const blog = await Blog.findOne({ where: { id: blogid } })

        if (!blog) return res.json({ status: 404, msg: `blog not found` })

        if (blog.user !== req.user) return res.json({ status: 404, msg: `Unauthorized Access` })


        let imageName;
        const image = req?.files?.image
        const filePath = './public/blogs'
        const slugData = slug(title, '_')
        const currentPath = `${filePath}/${blog.image}`

        if (image) {
            if (image.size >= 1000000) return res.json({ status: 404, msg: `file too larger than 1MB` })
            if (!image.mimetype.startsWith('image/')) return res.json({ status: 404, msg: `invalid image format, try uploading an image file` })

            // check for previous image and delete it before replacing it with the new one
            if (fs.existsSync(currentPath)) {
                fs.unlinkSync(currentPath)
            }
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath)
            }
            const date = new Date()
            imageName = `${slugData}-${date.getTime()}.png`


        }
        else {
            imageName = blog.image
        }
        blog.title = title
        blog.content = content
        blog.image = imageName
        blog.slug = slugData

        await blog.save()

        if (image) {
            await image.mv(`${filePath}/${imageName}`)
        }
        res.json({ status: 200, msg: `Blog Updated Successfully` })

    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}

exports.getSingleBlog = async (req, res) => {
    try {

        const { id } = req.params
        if (!id) return res.json({ status: 400, msg: `invalid blog id` })
        // res.json({ status: 200, msg: id })
        const findBlog = await Blog.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User, as: 'bloguser',
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt', 'image', 'email']
                    }
                },
                { model: Comment, as: 'comments' },
                { model: Like, as: 'likes' },
                { model: Dislike, as: 'dislikes' },
            ]

        })
        res.json({ status: 200, msg: findBlog })

    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}
exports.Allblogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            include: [
                {
                    model: Comment, as: 'comments',
                    
                },
                {
                    model: User, as: 'bloguser',
                },
                {
                    model: Like, as: 'likes',
                  
                },
                {
                    model: Dislike, as: 'dislikes',
                  
                },
            ],
            order: [['createdAt', 'DESC']]
        })
        res.json({ status: 200, msg: blogs })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}

exports.getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            where: { user: req.user },
            order: [['createdAt', 'Desc']]
        })
        res.json({ status: 200, msg: blogs })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        // Extract the blog id from the request body
        const { blogid } = req.body
        if (!blogid) return res.json({ status: 404, msg: ` blog id is required` })

        // Find the blog in the database by its id
        const blogs = await Blog.findOne({
            where: { id: blogid }
        })
        if (!blogs) return res.json({ status: 404, msg: `Blog id not found` })

        // Check if the user making the request is the owner of the blog
        if (blogs.user !== req.user) return res.json({ status: 404, msg: `Unauthorized access` })

        // If the blog has an associated image, delete it from the file system
        const imagePath = `./public/blogs/${blogs.image}`
        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath)
        }

        // Delete the blog from the database
        blogs.destroy()

        res.json({ status: 200, msg: `Blog deleted successfully` })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}

exports.CommentOnBlog = async (req, res) => {
    try {
        const { blogid, content } = req.body
        if (!blogid) return res.json({ status: 404, msg: 'Blog id is required' })
        if (!content) return res.json({ status: 404, msg: 'Content is required' })
        const checkBlogid = await Blog.findOne({
            where: { id: blogid }
        })
        if (!checkBlogid) return res.json({ status: 404, msg: 'Blog id not found' })
        await Comment.create({
            blog: blogid,
            content: content,
            user: req.user
        })
        return res.json({ status: 200, msg: ' commented successfully' })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}

exports.LikeBlogs = async (req, res) => {
    try {
        const { blogid } = req.body
        if (!blogid) return res.json({ ststus: 404, msg: "provide a valid blog id" })


        const checkBlog = await Blog.findOne({
            where: { id: blogid }
        })
        if (!checkBlog) return res.json({ status: 404, msg: 'Invalid Blog id' })

        const checkIfexist = await Dislike.findOne({
            where: { blog: blogid }
        })
        if (checkIfexist) {
            checkIfexist.destroy()
        }
        const checklike = await Like.findOne({
            where: { blog: blogid }
        })
        if (checklike) return res.json({ status: 404, msg: 'Already liked this blog' })

        const newlike = await Like.create({
            blog: blogid,
            user: req.user,
        })

        return res.json({ status: 200, msg: 'liked succesfully' })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}
exports.DislikeBlogs = async (req, res) => {
    try {
        const { blogid } = req.body
        if (!blogid) return res.json({ ststus: 404, msg: "provide a valid blog id" })
        const checkIfexist = await Like.findOne({
            where: { blog: blogid }
        })
        if (checkIfexist) {
            checkIfexist.destroy()
        }
        const checkBlog = await Blog.findOne({
            where: { id: blogid }
        })
        if (!checkBlog) return res.json({ status: 404, msg: 'Invalid Blog id' })
        const checkDislike = await Dislike.findOne({
            where: { blog: blogid }
        })
        if (checkDislike) return res.json({ status: 404, msg: 'Already disliked this blog' })

        const newdislike = await Dislike.create({
            blog: blogid,
            user: req.user,
        })
        return res.json({ status: 200, msg: 'disliked succesfully' })
    } catch (error) {
        res.json({ status: 500, msg: error })
    }
}