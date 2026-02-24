# API Carambar

Une API REST moderne construite avec **Node.js**, **Express** et **Sequelize** (SQLite)

# Fonctionnalités
- Récupérer toutes les blagues
- Ajouter de nouvelles blagues en base de données
- Rechercher une blague par son ID
- Mettre à jour ou supprimer des blagues existantes
- Documentation interactive avec **Swagger**

# Installation et Démarrage

1. **Cloner le projet**
```bash
git clone 
cd backend-carambar
```
2. Installer les dépendances
```bash
npm install
```
3. Lancer le serveur
```bash
npm run start
```

Le serveur démarrera sur http://localhost:3001

# Architecture du projet
Le projet suit l'approche MVC (Modèle-Vue-Contrôleur) :
- **Modèle**: Utilisation de Sequelize pour définir le schéma des blagues et interagir avec la base de données SQLite
- **Contrôleur**: La logique métier est isolée dans jokeController.js, pour une séparation claire en la requête et le traitement des données
- **Vue**: Dans cette architecture découplée, la "Vue" est double : 
    1. **API-Docs (Swagger)**: Elle sert de vue technique pour manipuler et tester les ressources
    2. **Frontend (Next.js)**: Elle constitue l'interface utilisateur finale qui consomme les données JSON 

# Documentation de l'API
L'API est entièrement documentée via Swagger. Vous pouvez tester chaque route directement depuis votre navigateur :

**Accéder au Swagger UI :** 
- En développement : http://localhost:3001/api-docs
- En production : https://carambar-co-api.onrender.com/api/

# Liste des Routes principales

| Méthode | Endpoint | Description
| :--- | : --- | :--- |
| **GET** | /api/jokes | Récupérer toutes les blagues
| **GET** | /api/jokes/:id | Récupérer une blague précise
| **POST** | /api/jokes | Ajouter une nouvelle blague
| **PUT** | /api/jokes/:id | Modifier une blague
| **DELETE** | /api/jokes/:id | Supprimer une blague

# Sécurité
L'API intégre plusieurs couches de protection :
- **Helmet** : protection des ne-têtes HTTP
- **CORS** : Gestion des accès cross-origin
- **Express Rate Limit** : Limitation du nombre de requêtes pour éviter des abus.
