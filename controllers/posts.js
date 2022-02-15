import mongoose from 'mongoose'
import Post from '../models/Post.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        res.status(200).json(posts)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new Post(post)

    try {
        await newPost.save()

        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({
            message: err.message
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

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No post with id: ' + id)
    }

    await Post.findByIdAndRemove(id)

    res.json({
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

    res.json(updatedPost)
}