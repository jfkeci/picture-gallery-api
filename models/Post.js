import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [Object],
        default: []
    },
    createdBy: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post;