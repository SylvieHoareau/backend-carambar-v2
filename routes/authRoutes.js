import express from 'express';
import { login } from '../controllers/authController.js'; // Vérifie bien le nom de ton fichier contrôleur

const router = express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Se connecter pour obtenir un token admin
 *     tags:
 *       - Authentification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "MonMotDePasseSecret123"
 *     responses:
 *       '200':
 *         description: Succès - Renvoie le token JWT
 *       '401':
 *         description: Identifiants incorrects
 */
router.post('/login', login);

export default router;