import { DataTypes } from "sequelize";
import sequelize from './index.js';

const Joke = sequelize.define('Joke', {
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    response: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Joke;