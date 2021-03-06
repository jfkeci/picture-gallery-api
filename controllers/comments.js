import mongoose from 'mongoose'
import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'

export const createPostComment = async (req, res) => {
    const { postId } = req.params
    const { text, createdBy } = req.body

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(404).json({ message: 'No post found' })
    }
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
        return res.status(404).json({ message: 'No user found' })
    }

    const post = await Post.findOne({ postId });
    const user = await User.findOne({ createdBy });

    let newComment = new Comment({
        postId: postId,
        text: text,
        createdBy: createdBy,
        createdUsername: user.name
    })

    if (post) {
        try {
            if (!post.comments) {
                post['comments'] = [newComment]
            } else {
                post.comments.push(newComment)
            }

            await Post.findByIdAndUpdate(postId, post, { new: true })

            return res.status(200).json(newComment)
        } catch (error) {
            return res.status(409).json({ message: error })
        }
    }
    return res.status(404).json({ message: 'No post found' })
}

export const deletePostComment = async (req, res) => {
    const { postId, commentId } = req.params

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(404).json({ message: 'No post found' })
    }

    const post = await Post.findOne({ _id: postId })

    post.comments = post.comments.filter((comment) => comment._id != commentId);

    try {
        let updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true })

        res.status(200).json({
            message: 'Comment deleted',
            post: updatedPost
        })
    } catch (error) {
        return res.status(409).json({ message: error })
    }
}

export const getPostComments = async (req, res) => {
    const { postId } = req.params

    const post = await Post.findOne({ postId });

    if (post) return res.status(200).json(post.comments)

    return res.status(404).json({ message: 'No post found' })
}

export const updatePostComment = async (req, res) => {
    const { postId, commentId } = req.params
    const { text } = req.body

    const post = await Post.findOne({ _id: postId })
    if (!post) return res.status(404).json({ message: 'No post found' })

    post.comments = post.comments.map(comment => {
        if (comment._id == commentId) {
            return { ...comment, text: text };
        }

        return comment;
    });

    try {
        let updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true })

        res.status(200).json({
            message: 'Comment updated',
            post: updatedPost
        })
    } catch (error) {
        return res.status(409).json({ message: error })
    }
}