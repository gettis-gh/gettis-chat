import User from '../model/user.model.js';
import { internalError, success } from '../service/response.service.js';

export const createUser = async (username) => {
  try {
    const user = await User.create({ username });
    return success("User created succesfully.", user);
  } catch (error) {
    return internalError("Error trying to create user.", error.message);
  }
};

export const findUserIdByUsername = async (username) => {
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return internalError("User not found.");
    }
    return success("User found.", { id: user.id });
  } catch (error) {
    return internalError("Error trying to find user.", error.message);
  }
};

export const findUsernameByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId); // Busca por clave primaria (id)
    if (!user) {
      return internalError("User not found.");
    }
    return success("User found.", { username: user.username });
  } catch (error) {
    return internalError("Error trying to find user.", error.message);
  }
};
