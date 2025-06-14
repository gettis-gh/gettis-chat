import { getMessages } from "../../../controller/message.controller.js";

export async function handleGetMessages({ query = {}, ws }) {
  const { amount = 50 } = query;

  const result = await getMessages({ amount });

  if (result.error) {
    ws.send(JSON.stringify({
      type: "error",
      content: JSON.stringify(result)
    }));
    return;
  }

  ws.send(JSON.stringify({
    type: "return-messages",
    content: result.attachData
  }));
}