import swaggerJSDoc from "swagger-jsdoc";
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Récupération de l'URL de base de l'API depuis les variables d'environnement
const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:3001/api/";
const apiProdUrl = process.env.API_PROD_URL || "https://carambar-co-api.onrender.com/api/";


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Carambar&Co API",
            version: "1.0.0",
            description: "Cette API permet de gérer et de récupérer des blagues pour l'application Carambar&Co."
        },
        servers: [
            {
                url: apiBaseUrl,
                description: "Serveur de développement"
            },
            {
                url: apiProdUrl,
                description: "Serveur de production"
            }
        ]
    },
    apis: ["./routes/*.js"] // Chemin vers les fichiers contenant les annotations Swagger
};

export const specs = swaggerJSDoc(options);
