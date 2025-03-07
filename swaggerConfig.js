const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User API",
            version: "1.0.0",
            description: "API quản lý người dùng",
        },
        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local server",
            },
        ],
    },
    apis: [ "./routes/*.js" ], // Định nghĩa API từ các file route
};

const swaggerSpecs = swaggerJsdoc(options);
module.exports = swaggerSpecs;
