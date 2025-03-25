import express, { Application, Request, Response }  from "express";
import userRoutes from "../routes/user.routes";
// inference de type : lorsque le language devine le type d'une variable a partir du type de données qui sert a l'initialisation
export const app: Application = express();
import errorHandler from '../middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';


// Middlewares
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

// Routes
// Une route : l'association METHOD  http + URL + callback
app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Bienvenue sur mon API Express avec TypeScript ✨' );

});

