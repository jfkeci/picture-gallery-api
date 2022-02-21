import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Picture Gallery API",
            description: "Picture Gallery API  Documentation",
            contact: {
                name: 'jfkeci',
                url: 'https://github.com/jfkeci',
            },
            servers: [{
                url: 'http://localhost:5001',
                description: 'Development server',
            },]
        }
    },
    apis: [
        "./routes/*.js"
    ]
}

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
