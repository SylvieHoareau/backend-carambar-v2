import Joke from '../models/jokeModel.js';
import sequelize from '../models/index.js';
import { z } from 'zod';

// Schéma de validation pour les blagues
const jokeSchema = z.object({
    question: z.string().min(1, { message: "La question est requise." }),
    response: z.string().min(1, { message: "La réponse est requise." })
});

// Obtenir toutes les blagues
export const getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        res.json(jokes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des blagues." });
    }
};

// Obtenir une blague aléatoire
export const getRandomJoke = async (req, res) => {
    try {
        const joke = await Joke.findOne({ 
            order: sequelize.random() 
        });
        if (joke) {
            res.json(joke);
        } else {
            res.status(404).json({ message: 'Aucune blague trouvée !' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération d'une blague aléatoire." });
    }
};

// Ajouter une nouvelle blague
export const addJoke = async (req, res) => {
    try {

        // Validation des données d'entrée
        const validatedData = jokeSchema.parse(req.body);

        // Création de la blague dans la base de données
        const newJoke = await Joke.create(validatedData);
        
        res.status(201).json({ 
            message: 'Blague ajoutée avec succès !', 
            joke: newJoke
        });
    }
    catch (error) {
        // Si Zod détecte une erreur de validation, on renvoie un message d'erreur clair
        if (error instanceof z.ZodError) {
            const validationErrors = error.errors.map(err => err.message).join(' ');
            return res.status(400).json({ message: validationErrors });
        }
        // Sinon, renvoie l'erreur réelle pour le debug, mais en production, on pourrait vouloir masquer cela
        res.status(500).json({ message: "Données invalides ou manquantes." });
    }
};

// Obtenir une blague par son ID
export const getJokeById = async (req, res) => {
    try {
        // Recherche de la blague par son ID
        const joke = await Joke.findByPk(req.params.id);

        // On vérifie si la blague existe
        if (joke) {
            res.json(joke);
        } else {
            res.status(404).json({ message: 'Blague non trouvée !' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }   
};

// Mettre à jour une blague par son ID
export const updateJokeById = async (req, res) => {
    try {
        const { question, response } = req.body;
        const [updated] = await Joke.update(
            { question, response }, 
            { where: { id: req.params.id }
        });

        if (updated) {
            const updatedJoke = await Joke.findByPk(req.params.id);
            res.json({ message: 'Blague mise à jour avec succès !', joke: updatedJoke });
        }
        else 
        {
            res.status(404).json({ message: 'Blague non trouvée !' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// Supprimer une blague par son ID
export const deleteJokeById = async (req, res) => {
    try {
        const deleted = await Joke.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.json({ message: 'Blague supprimée avec succès !' });
        } else {
            res.status(404).json({ message: 'Blague non trouvée !' });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" });
    }
};