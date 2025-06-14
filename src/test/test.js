import { getMessages, createMessage } from "../controller/message.controller.js";
import { createUser, findUserIdByUsername } from "../controller/user.controller.js";
import sequelize from "../database/sequelize.js";

async function simulationTest() {
    (async () => {
        try {
            await sequelize.sync();
            console.log("✅ Database synced");
        } catch (error) {
            console.error("❌ DB sync error:", error.message);
        }
      })();

  const testUsername = "test-user";

  // Paso 1: Crear usuario
  const createResult = await createUser(testUsername);
  console.log("✅ Usuario creado:", createResult);

  // Paso 2: Obtener userId
  const userIdResult = await findUserIdByUsername(testUsername);
  if (userIdResult.error) {
    console.error("❌ Error al buscar userId:", userIdResult);
    return;
  }
  const userId = userIdResult.attachData.id;

  // Paso 3: Crear mensaje
  const now = new Date().toISOString();
  const messageData = {
    content: "Mensaje de prueba",
    metadata: {
      author: testUsername,
      type: "message",
      timestamp: now,
      parentId: null
    }
  };

  const createMessageResult = await createMessage(messageData);
  console.log("✅ Mensaje creado:", createMessageResult);

  // Paso 4: Obtener mensajes
  const getMessagesResult = await getMessages({ amount: 10 });
  console.log("📦 Mensajes recibidos:", JSON.stringify(getMessagesResult.attachData, null, 2));
}

simulationTest().catch(console.error);
