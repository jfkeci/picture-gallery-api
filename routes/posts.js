import express from 'express'

import { getPosts, createPost, updatePost, deletePost, likePost, getPost, searchPosts } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

import { upload } from '../uploads.js'


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a list of Picture Gallery posts.
 *     description: Retrieve a list of Picture Gallery posts.. Can be used to populate a list of posts when as demo on picture-gallery vue app.
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */
router.get('/', getPosts)
router.get('/search', searchPosts)

/**
* @swagger
* /posts/{id}:
*   get:
*     summary: Retrieve a single Picture Gallery post.
*     description: Retrieve a single Picture Galler post. Can be used for populating a single post view with single post data.
*     parameters: 
*      - in: path
*        name: id
*        required: true
*        description: String ID of the post to retrieve
*        schema: 
*           type: integer 
*     responses:
*       200:
*         description: A single post.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 data:
*                   $ref: '#/components/schemas/Post'
*/
router.get('/:id', getPost)
router.post('/', upload.single('selectedFile'), createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/like/:id/:userId', likePost)


export default router;


// post schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The post ID.
 *           example: 62124b4fbed6940f1b55d992
 *         title:
 *           type: string
 *           description: The post title.
 *           example: A nice sunset
 *         body:
 *           type: string
 *           description: The post description.
 *           example: This picture was taken this summer in Dubrovnik
 *         tags:
 *           type: array
 *           description: Post tags.
 *           example: [summer, sea, sunset]
 *         selectedFile:
 *           type: string
 *           description: The post image.
 *           example: summer.png
 *         likes:
 *           type: array
 *           description: List of users that liked the post.
 *           example: [<userId1>, <userId2>]
 *         comments:
 *           type: array
 *           description: List of comments from the post.
 *           example: [{_id: <commentId>, text: Nice photo, createdAt: 2022-02-20T13:51:31.537+00:00, createdBy: <userId>, createdUsername: <username>}]
 *         createdBy:
 *           type: string
 *           description: Id of the user who created the post.
 *           example: 62124b4fbed6940f1b55d992
 *         createdAt:
 *           type: string
 *           description: Date and time when the post was created
 *           example: 2022-02-20T13:51:31.537+00:00
 */

// comment schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Comment ID.
 *           example: 62124b4fbed6940f1b55d992
 *         text:
 *           type: string
 *           description: Comment text.
 *           example: This is a nice picture
 *         createdUsername:
 *           type: string
 *           description: Name of the user that created the comment.
 *           example: John Doe
 *         createdBy:
 *           type: string
 *           description: Id of the user that created the comment.
 *           example: 62124b4fbed6940f1b55d992
 *         createdAt:
 *           type: string
 *           description: Date and time when the post was created
 *           example: 2022-02-20T13:51:31.537+00:00
 */

//user schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: User ID.
 *           example: 62124b4fbed6940f1b55d992
 *         name:
 *           type: string
 *           description: User first name and last name.
 *           example: John Doe
 *         email:
 *           type: string
 *           description: User email.
 *           example: john.doe@mail.com
 *         password:
 *           type: string
 *           description: User password, hashed with bcryptjs.
 *           example: $2a$12$qkd8Fk/kN5UFPuT25b3kpum/xr4pSCHZwlk3Ho9Oa6DVCrBhV45RW
 *         createdAt:
 *           type: string
 *           description: Date and time when the post was created
 *           example: 2022-02-20T13:51:31.537+00:00
 */