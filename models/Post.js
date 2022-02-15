import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdBy: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Post = mongoose.model('Post', postSchema)

export default Post;