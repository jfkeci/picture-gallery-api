import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    text: String,
    createdBy: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Comment = mongoose.model('Comment', commentSchema)

export default Comment;