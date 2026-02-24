import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';
import sequelize from '../models/index.js';
import Joke from '../models/jokeModel.js';

// Tests des endpoints des blagues
describe('Tests des endpoints des blagues', () => {
    
   const testJokes = [
        {
            question: "Pourquoi les oiseaux volent-ils vers le sud ?",
            response: "Parce que c'est trop loin pour y aller à pied !"
        },
        {
            question: "Quel est le comble pour un électricien ?",
            response: "D'avoir des ampoules aux pieds."
        },
        {
            question: "Qua dit un citron qui fait une blague ?",
            response: "Je suis pressé de vous faire rire !"
        }
    ];

    beforeEach(async() => {
        // On vide les tables avant chaque test pour s'assurer de l'isolation des tests
        await sequelize.sync({ force: true });
    });

    // Après les tests, on ferme la connexion à la base de données
    afterAll(async() => {
        await sequelize.close();
    });

    // Test pour GET /api/jokes
    describe('GET /api/jokes', () => {
        it('devrait retourner une liste vide au début', async() => {
            const res = await request(app).get('/api/jokes');

            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBe(0);
        });
    });

    // Test pour GET /api/jokes/random
    describe('GET /api/jokes/random', () => {
         beforeEach(async() => {
            // On ajoute quelques blagues de test avant chaque test
            await Joke.bulkCreate(testJokes);
        });
        it('devrait retourner une blague aléatoire', async() => {

            // Maintenant, on demande une blague aléatoire
            const res = await request(app).get('/api/jokes/random');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('question');
            // On vérifie que la question reçue fait bien partie de notre liste
            const questions = [
                "Pourquoi les oiseaux volent-ils vers le sud ?",
                "Quel est le comble pour un électricien ?",
                "Qua dit un citron qui fait une blague ?"
            ];
            expect(questions).toContain(res.body.question);

            expect(typeof res.body.question).toBe('string');
        });

        it('GET /api/jokes/random - Ne doit pas être vide', async() => {
            // D'abord, on ajoute une blague pour être sûr qu'il y en a au moins une
            const res = await request(app).get('/api/jokes/random');

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('question');
            expect(res.body).toHaveProperty('response');
            expect(typeof res.body.question).toBe('string');
            expect(typeof res.body.response).toBe('string');
        })

        it('devrait retourner 404 si aucune blague n\'existe', async() => {
            // On vide la table juste avant pour s'assurer qu'elle est vide
            await Joke.destroy({ where: {}, truncate: true });

            const res = await request(app).get('/api/jokes/random');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Aucune blague trouvée !');  
        });
    });

    // Test pour POST /api/jokes
    describe('POST /api/jokes', () => {
        it('devrait ajouter une nouvelle blague', async() => {
            const nouvelleBlague = {
                question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
                response: "Parce que sinon ils tombent dans le bateau."
            };

            const res = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);

            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('message', 'Blague ajoutée avec succès !');
            expect(res.body).toHaveProperty('joke');
            expect(res.body.joke).toHaveProperty('id');
            expect(res.body.joke.question).toBe(nouvelleBlague.question);
        });
    });

    // Test pour GET /api/jokes/:id
    describe('GET /api/jokes/:id', () => {
        it('devrait récupérer une blague par son ID', async() => {
            // D'abord, on ajoute une blague pour avoir un ID à tester
            const nouvelleBlague = {
                question: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?",
                response: "Parce que sinon ils tombent dans le bateau."
            };

            const postRes = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);

            const blagueId = postRes.body.joke.id;

            // Maintenant, on la récupère
            const getRes = await request(app).get(`/api/jokes/${blagueId}`);

            expect(getRes.statusCode).toBe(200);
            expect(getRes.body.question).toBe(nouvelleBlague.question);
        });
    });

    // Test pour GET /api/jokes/:id - blague non trouvée
    describe('GET /api/jokes/:id - blague non trouvée', () => {
        it('devrait retourner 404 si la blague n\'existe pas', async() => {
            const res = await request(app).get('/api/jokes/9999'); // ID improbable

            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('message', 'Blague non trouvée !');
        });
    });

    // Test pour PUT /api/jokes/:id - mise à jour
    describe('PUT /api/jokes/:id', () => {
        it('devrait mettre à jour une blague existante', async() => {
            // D'abord, on ajoute une blague
            const nouvelleBlague = {
                question: "Pourquoi les squelettes ne se battent-ils jamais entre eux ?",
                response: "Ils n'ont pas le cran."
            };

            const postRes = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);

            const blagueId = postRes.body.joke.id;

            // Maintenant, on la met à jour
            const miseAJour = {
                question: "Pourquoi les squelettes ne se battent-ils jamais ?",
                response: "Parce qu'ils n'ont pas le cran."
            };

            const putRes = await request(app)
                .put(`/api/jokes/${blagueId}`)
                .send(miseAJour);

            expect(putRes.statusCode).toBe(200);
            expect(putRes.body).toHaveProperty('message', 'Blague mise à jour avec succès !');
            expect(putRes.body.joke.question).toBe(miseAJour.question);
        });
    });

    // Test pour DELETE /api/jokes/:id
    describe('DELETE /api/jokes/:id', () => {
        it('devrait supprimer une blague existante', async() => {
            // D'abord, on ajoute une blague
            const nouvelleBlague = {
                question: "Pourquoi les mathématiciens détestent-ils la forêt ?",
                response: "Parce qu'il y a trop de racines carrées."
            };

            const postRes = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);

            const blagueId = postRes.body.joke.id;

            // Maintenant, on la supprime
            const deleteRes = await request(app).delete(`/api/jokes/${blagueId}`);

            expect(deleteRes.statusCode).toBe(200);
            expect(deleteRes.body).toHaveProperty('message', 'Blague supprimée avec succès !');

            // On vérifie qu'elle n'existe plus
            const getRes = await request(app).get(`/api/jokes/${blagueId}`);
            expect(getRes.statusCode).toBe(404);
        });
    });

    // Test pour POST /api/jokes - données manquantes
    it('devrait retourner 500 ou 400 si des données sont manquantes', async () => {
        const res = await request(app)
            .post('/api/jokes')
            .send({ question: "Blague sans réponse ?" }); // Pas de champ 'response'

        expect(res.statusCode).not.toBe(201);
    });

    // Flux complet : Création et Récupération
    describe('Flux complet : Création et Récupération', () => {
        it('devrait créer une blague puis la récupérer dans la liste', async () => {
            const nouvelleBlague = {
                question: "Pourquoi les développeurs détestent-ils la nature ?",
                response: "Parce qu'il y a trop de bugs."
            };

            // On envoie la blague (POST)
            const postRes = await request(app)
                .post('/api/jokes')
                .send(nouvelleBlague);
                
            expect(postRes.statusCode).toBe(201);
            expect(postRes.body).toHaveProperty('joke');
            expect(postRes.body.joke.question).toBe(nouvelleBlague.question);

            // On vérifie qu'elle est bien dans la liste (GET)
            const getRes = await request(app).get('/api/jokes');

            expect(getRes.statusCode).toBe(200);
            expect(getRes.body.length).toBe(1);
            expect(getRes.body[0].question).toBe(nouvelleBlague.question);
        })
    });
});

