import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

export default User;