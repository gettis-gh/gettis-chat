// models/message.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../database/sequelize.js';

const Message = sequelize.define('message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT, // el contenido del mensaje
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // tipo: text, image, etc.
    allowNull: false
  },
  author: {
    type: DataTypes.STRING, // o UUID si usas usuarios
    allowNull: false
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: true // null si no responde a otro mensaje
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

export default Message;