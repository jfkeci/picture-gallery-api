import express from 'express'

import { getPostComments, deletePostComment, updatePostComment, createPostComment } from '../controllers/comments.js'


const router = express.Router()

router.post('/:postId', createPostComment)
router.get('/:postId', getPostComments)
router.delete('/:postId/:commentId', deletePostComment)
router.patch('/:postId/:commentId', updatePostComment)

export default router;