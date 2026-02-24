import app from './app.js';
import sequelize from './models/index.js';
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Définition du port d'écoute
const PORT = process.env.PORT || 3001;

// Fonction pour démarrer le serveur
const startServer = async() => {
    try {
        // Connexion et synchronisation de la base de données
        await sequelize.sync();
        console.log('Base de données synchronisée');

        // On lance le serveur
        const server = app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}`);
            console.log('Accueil : http://localhost:' + PORT);
            console.log('Accéder à l API : http://localhost:' + PORT + '/users pour les utilisateurs et http://localhost:' + PORT + '/api/jokes pour les blagues.');
            console.log('Appuyez sur CTRL+C pour arrêter le serveur.');
        });

        // On écoute les erreurs spécifiques du serveur
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Le port ${PORT} est déjà utilisé. Veuillez choisir un autre port.`);
                console.error(`Pour arrêter le serveur en cours, utilisez : kill -9 $(lsof -t -i:${PORT})`);
            } else {
                console.error('Erreur du serveur :', err);
            }
        });

    } catch (error) {
        console.error('Impossible de démarrer le serveur :', error);
        process.exit(1); // On quitte le processus avec une erreur
    }
};

// Exécution de la fonction pour démarrer le serveur
startServer();

