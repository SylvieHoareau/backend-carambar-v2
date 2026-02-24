import sequelize from '../models/index.js';
import Joke from '../models/jokeModel.js';

const initialJokes = [
    { question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?", answer: "Parce que sinon ils tombent dans le bateau." },
    { question: "Quel est le comble pour un électricien ?", answer: "De ne pas être au courant." },
    { question: "Pourquoi les canards ont-ils des pattes palmées ?", answer: "Pour marcher sur l'eau." },
    { question: "Que dit une imprimante dans l'eau ?", answer: "J'ai papier." },
    { question: "Pourquoi les squelettes ne se battent-ils jamais entre eux ?", answer: "Parce qu'ils n'ont pas le cran." }
];

const seed = async () => {
    try {
        // Synchronisation de la base de données (création des tables)
        await sequelize.sync({ force: true });
        console.log('Base de données synchronisée.');

        // Insertion des blagues initiales
        await Joke.bulkCreate(initialJokes);
        console.log('Données initiales insérées avec succès.');

        // Fermeture de la connexion à la base de données
        process.exit(0);
    } catch (error) {
        console.error('Erreur lors du seed de la base de données :', error);
        process.exit(1);
    }
};

// Exécution du script de seed
seed();