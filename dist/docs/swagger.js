"use strict";
// Code pour générer la documentation Swagger
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'A RESTful API for managing todos built with Express and TypeScript',
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
            },
        ],
        components: {
            schemas: {
                Todo: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        completed: { type: 'boolean' },
                        dueDate: { type: 'string', format: 'date-time' },
                        priority: {
                            type: 'string',
                            enum: ['LOW', 'MEDIUM', 'HIGH']
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' }
                    },
                },
                CreateTodo: {
                    type: 'object',
                    required: ['title', 'priority'],
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        dueDate: { type: 'string', format: 'date-time' },
                        priority: {
                            type: 'string',
                            enum: ['LOW', 'MEDIUM', 'HIGH']
                        }
                    }
                },
                UpdateTodo: {
                    type: 'object',
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        dueDate: { type: 'string', format: 'date-time' },
                        completed: { type: 'boolean' },
                        priority: {
                            type: 'string',
                            enum: ['LOW', 'MEDIUM', 'HIGH']
                        }
                    }
                }
            }
        },
    },
    apis: ['./src/routes/*.ts'], // ← là où Swagger ira chercher les commentaires JSDoc
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
