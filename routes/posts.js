import express from 'express'

import { getPosts, createPost, updatePost, deletePost, likePost, getPost, populatePosts } from '../controllers/posts.js'

import auth from '../middleware/auth.js'

const router = express.Router()


/**
 * @swagger
 * /posts:
 *  get:
 *      description: Get all posts
 *      responses:
 *          '200':
 *              description: A successfull request
 */
router.get('/', getPosts)
router.get('/:id', getPost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/like/:id', likePost)

export default router;
