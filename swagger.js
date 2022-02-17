import swaggerJsDoc from 'swagger-jsdoc'

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Picture Gallery API",
            description: "Customer API Information",
            contact: {
                name: "jfkeci"
            },
            servers: ["http://localhost:5001"]
        }
    },
    apis: [
        "./routes/*.js"
    ]
}

export const swaggerDocs = swaggerJsDoc(swaggerOptions);
