import express, { Application, Request, Response }  from "express";

// inference de type : lorsque le language devine le type d'une variable a partir du type de données qui sert a l'initialisation
export const app: Application = express();

// Middlewares
app.use(express.json());

// Routes
// Une route : l'association METHOD  http + URL + callback
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Bienvenue sur mon API Express avec TypeScript ✨' });

});

