import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt for user:", username); // Log pour le debug

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch); // Log pour le debug

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Création du token JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Generated JWT token:", token); // Log pour le debug

        res.json({ token });
    } catch (err) {
        console.log("Error during login:", err); // Log pour le debug
        res.status(500).json({ message: 'Server error' });
    }
};