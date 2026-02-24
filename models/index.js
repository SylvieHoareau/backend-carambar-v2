import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Récupération du chemin de stockage de la base de données depuis les variables d'environnement
// Si on est en environnement de test, on utilise une base en mémoire
const dbStorage = process.env.NODE_ENV === 'test'
                    ? './database-test.sqlite'
                    : (process.env.DB_STORAGE || './database.sqlite');

// Configuration de Sequelize pour utiliser SQLite

// On crée une instance qui pointe vers un fichier local
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbStorage
});

export default sequelize;