import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.js';
import jokeRoutes from './routes/jokeRoutes.js';
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Création de l'application Express
const app = express();

// Middleware de sécurité pour les en-têtes HTTP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", "http://localhost:3000", "http://localhost:3001", "https://sylviehoareau.github.io", "https://carambar-co-api-cwkc.onrender.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            imgSrc: ["'self'", "data:", "https://validator.swagger.io"]
        }
    }
})
);

const allowedOrigins = [
    'http://localhost:3000', 
    'http://localhost:3001', 
    'https://sylviehoareau.github.io'
];

// Configuration CORS
const corsOptions = {
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
};

// Activer CORS avec les options définies
app.use(cors(corsOptions));

// Middleware pour lire le JSON
app.use(express.json());

// Limiteur de taux pour prévenir les abus
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre (ici, par 15 minutes)
    message: { message: "Trop de requêtes provenant de cette IP, veuillez réessayer plus tard." }
});

// Appliquer le rate limiter à toutes les requêtes
if (process.env.NODE_ENV !== 'test')
{
    app.use(limiter);
}

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Route de base
app.get('/', (req, res) => {
  res.redirect('/api-docs'); // Redirige vers la documentation Swagger
});

// Liste des utilisateurs
// app.get('/users', (req, res) => {
//     res.json([
//         { id: 1, name: 'Alice' },
//         { id: 2, name: 'Bob' }
//     ]);
// });

// Ajouter un utilisateur
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     // Ici, vous ajouteriez l'utilisateur à votre base de données
//     res.status(201).json({ message: 'Utilisateur ajouté avec succès !', user: newUser });
// });

// Utilisation des routes pour les blagues
app.use('/api/jokes', jokeRoutes);

export default app;

