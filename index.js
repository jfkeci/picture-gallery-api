import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import { swaggerDocs } from './swagger.js'
import { logger } from './logger.js'

dotenv.config()

import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'
import commentRoutes from './routes/comments.js'

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(bodyParser.json({ limit: "30Mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30Mb", extended: true }))

app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)
app.use('/comments', commentRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to picture gallery api')
})

app.use(express.static('uploads'))

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5001

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => {
        logger.info('Server running on port ' + PORT)
    })
}).catch((err) => {
    console.log('Error ' + err.message)
})




