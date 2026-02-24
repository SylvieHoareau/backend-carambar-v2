import express from "express";
import {
  addJoke,
  getAllJokes,
  getRandomJoke,
  getJokeById,
  updateJokeById,
  deleteJokeById,
} from "../controllers/jokeController.js";
const router = express.Router();

// Route pour ajouter une blague
/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Ajouter une nouvelle blague
 *     tags:
 *       - Blagues
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *               response:
 *                 type: string
 *                 example: "Parce que sinon ils tombent dans le bateau."
 *     responses:
 *       '201':
 *         description: Blague ajoutée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blague ajoutée avec succès !"
 *                 joke:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *                     response:
 *                       type: string
 *                       example: "Parce que sinon ils tombent dans le bateau."
 *       '500':
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 *
 */
router.post("/", addJoke);

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: Obtenir toutes les blagues
 *     tags:
 *       - Blagues
 *     responses:
 *       '200':
 *         description: Liste des blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   question:
 *                     type: string
 *                     example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *                   response:
 *                     type: string
 *                     example: "Parce que sinon ils tombent dans le bateau."
 *       '500':
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
// Route pour obtenir toutes les blagues
router.get("/", getAllJokes);

/**
 * @swagger
 * /jokes/random:
 *   get:
 *     summary: Obtenir une blague aléatoire
 *     tags:
 *       - Blagues
 *     responses:
 *       '200':
 *         description: Blague aléatoire trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 question:
 *                   type: string
 *                   example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *                 response:
 *                   type: string
 *                   example: "Parce que sinon ils tombent dans le bateau."
 *       '404':
 *         description: Aucune blague trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune blague trouvée !"
 *       '500':
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
router.get("/random", getRandomJoke);

/**
 * @swagger
 * /jokes/{id}:
 *   get:
 *     summary: Obtenir une blague par son ID
 *     tags:
 *       - Blagues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de la blague à récupérer
 *     responses:
 *       '200':
 *         description: Blague trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 question:
 *                   type: string
 *                   example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *                 response:
 *                   type: string
 *                   example: "Parce que sinon ils tombent dans le bateau."
 *       '404':
 *         description: Blague non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blague non trouvée !"
 *       '500':
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
// Route pour obtenir une blague par son ID
router.get("/:id", getJokeById);

/**
 * @swagger
 * /jokes/{id}:
 *   put:
 *     summary: Mettre à jour une blague par son ID
 *     tags:
 *       - Blagues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de la blague à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *               response:
 *                 type: string
 *                 example: "Parce que sinon ils tombent dans le bateau."
 *     responses:
 *       '200':
 *         description: Blague mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blague mise à jour avec succès !"
 *                 joke:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     question:
 *                       type: string
 *                       example: "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ?"
 *                     response:
 *                       type: string
 *                       example: "Parce que sinon ils tombent dans le bateau."
 *       '404':
 *         description: Blague non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blague non trouvée !"
 *       '500':
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
// Route pour mettre à jour une blague par son ID
router.put("/:id", updateJokeById);

/**
 * @swagger
 * /jokes/{id}:
 *   delete:
 *     summary: Supprimer une blague par son ID
 *     tags:
 *       - Blagues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID de la blague à supprimer
 *     responses:
 *       '200':
 *         description: Blague supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blague supprimée avec succès !"
 *       '404':
 *         description: Blague non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Blague non trouvée !"
 *       '500':
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur serveur"
 */
// Route pour supprimer une blague par son ID
router.delete("/:id", deleteJokeById);

// Exporter le routeur
export default router;
