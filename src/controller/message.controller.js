import Message from '../model/message.model.js';
import { internalError, success } from '../service/response.service.js';

// Crear mensaje
export async function createMessage({ content, metadata }) {
  const { type, parentId = null, author, timestamp } = metadata;

  try {
    const message = await Message.create({
      content,
      type,
      author,
      parentId,
      timestamp: new Date(timestamp)
    });

    return success("Message created successfully.", message);
  } catch (error) {
    return internalError("Error trying to create message.", error.message);
  }
}

// Obtener mensajes
export async function getMessages(query = {}) {
  const { amount = 50 } = query;

  try {
    const messages = await Message.findAll({
      limit: amount,
      order: [['timestamp', 'DESC']]
    });

    return success("Messages retrieved successfully.", messages);
  } catch (error) {
    return internalError("Error trying to retrieve messages.", error.message);
  }
}
