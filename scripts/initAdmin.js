import sequelize from "../models/index.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
    try {
        await sequelize.sync(); // Synchroniser la base de données
        
        // On vérifie si l'admin existe déjà pour éviter les doublons
        const adminExists = await User.findOne({ where: { username: "admin" } });

        if (!adminExists) {
            await User.create({ username: "admin", password: "admin123" });
            console.log("L'administrateur a été créé avec le nom d'utilisateur: 'admin' et le mot de passe: 'admin123'");
        } else {
            console.log("L'administrateur existe déjà.");
        }
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        await sequelize.close(); // Fermer la connexion à la base de données
    }
};

createAdmin();