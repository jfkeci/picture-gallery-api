import mongoose from 'mongoose'
import Post from '../models/Post.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ createdAt: 'desc' })

        return res.status(200).json(posts)
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

export const searchPosts = async (req, res) => {
    const { filter } = req.query
    console.log(filter)
    try {
        const posts = await Post.find({ "title": new RegExp(filter, 'i') },)

        return res.status(200).json(posts)
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

export const createPost = async (req, res) => {
    let post = req.body
    post['selectedFile'] = req.file.filename

    const newPost = new Post(post)

    try {
        await newPost.save()

        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(409).json({ message: error })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params

    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json('No post with id: ' + id)
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    return res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No post with id: ' + id })
    }

    await Post.findByIdAndRemove(id)

    return res.json({
        message: `Post ${id} deleted successfully`
    })
}

export const likePost = async (req, res) => {
    const { id, userId } = req.params

    if (!userId) {
        return res.json({ message: 'Not allowed' })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'No post with id: ' + id })
    }

    const post = await Post.findById(id)

    const index = post.likes.findIndex((id) => id === String(userId))

    if (index === -1) {
        post.likes.push(userId)
    } else {
        post.likes = post.likes.filter((id) => id !== String(userId))
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    return res.status(200).json(updatedPost)
}

export const getPost = async (req, res) => {
    const { id } = req.params

    const post = await Post.findOne({ id });

    if (post) return res.status(200).json(post)

    return res.status(404).json({ message: 'No post found' })
}

export const populatePosts = async (req, res) => {

    let { no } = req.body

    let img = 'https://picsum.photos/1500/1500'

    let newPost = new Post({
        title: 'Post ' + no,
        body: 'Post body ' + no,
        tags: ['food ' + no, 'healthy ' + no, 'chef ' + no],
        selectedFile: img,
        createdBy: 'jfkeci',
    })

    try {
        await newPost.save()

        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(409).json({
            message: error
        })
    }
}