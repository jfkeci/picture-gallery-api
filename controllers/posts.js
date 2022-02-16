import mongoose from 'mongoose'
import Post from '../models/Post.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        return res.status(200).json(posts)
    } catch (err) {
        return res.status(404).json({
            message: err.message
        })
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new Post(post)

    try {
        await newPost.save()

        return res.status(201).json(newPost)
    } catch (error) {
        return res.status(409).json({
            message: error
        })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params

    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id: ' + id)
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })

    return res.status(200).json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id: ' + id)
    }

    await Post.findByIdAndRemove(id)

    return res.json({
        message: `Post ${id} deleted successfully`
    })
}

export const likePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id: ' + id)
    }

    const post = await Post.findById(id)

    const updatedPost = await Post.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true })

    return res.stats(200).json(updatedPost)
}

export const getPost = async (req, res) => {
    const { id } = req.params

    const post = await Post.findOne({ id });

    if (post) return res.status(200).json(post)

    return res.status(404).json({ message: 'No post found' })
}