// This file is used to configure the express application
// It imports the express module and the todoRoutes
// It also configures the middlewares and the routes

//Importation des modules
import express, { Application, Request, Response }  from "express";
import helmet from 'helmet'
import cors from 'cors';

// Routes
import todoRoutes from "../routes/todo.routes";
import authRoutes from "../routes/auth.routes";

// inference de type : lorsque le language devine le type d'une variable a partir du type de données qui sert a l'initialisation
export const app: Application = express();
import errorHandler from '../middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../docs/swagger'


// Middlewares
// Sécurité avec helmet
app.use(helmet())
//Partage des ressources (cors)
app.use(cors())
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/todos', todoRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(errorHandler);

// Routes
// Une route : l'association METHOD  http + URL + callback
app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Bienvenue sur mon API Express avec TypeScript ✨' );

});

app.get('/api-docs-json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  



