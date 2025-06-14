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

export async function deleteMessageTree(messageId) {
    const children = await Message.findAll({where: { parentId: messageId }});

    for (const child of children) {
        await deleteMessageTree(child.id);
    }

    const result = await deleteMessage(messageId);
        
    if (result.error) {
        return internalError("Error during deleting message.", result);
    }

    return result;
}

export async function deleteMessage(messageId) {
    try {
        const result = await Message.destroy({ where: { id: messageId } });

        return success("Message deleted succesfully.", result)
    } catch (error) {
        return internalError("Error trying to delete message.", error.message)
    }
}

export async function deleteAllMessages() {
    try {
        const result = await Message.destroy({ where: {} });
        return success("Message deleted succesfully.", result)
    } catch (error) {
        return internalError("Error trying to delete message.", error.message)
    }
}

export async function replaceMessage({ messageId, newContent }) {
    try {
        const message = await Message.findOne({ where: { id: messageId } });

        if (!message) {
            return internalError("Message not found.");
        }

        message.content = newContent;
        await message.save();

        return success("Message updated successfully.", message);
    } catch (error) {
        return internalError("Error trying to delete message.", error.message)
    }
}