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
    type: DataTypes.TEXT,
    allowNull: false
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {text:"text"}
  }
});

export default Message;