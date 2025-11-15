import { StreamChat } from "stream-chat";
import { env } from "./env.js";

const apiKey = env.STREAM_API_KEY;
const apiSecret = env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error(
    "Stream API key and secret must be set in environment variables."
  );
}

const chatClient = StreamChat.getInstance(apiKey, apiSecret);

const upsertStreamUser = async (user) => {
  // create and update
  const { id, name, profileImage } = user;

  try {
    await chatClient.upsertUser({
      id: id,
      name: name,
      image: profileImage,
    });
    console.log(`Stream user ${id} upserted successfully.`);
  } catch (error) {
    console.error(`Error upserting Stream user ${id}:`, error);
  }
};

const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId, { markMessagesDeleted: true });
    console.log(`Stream user ${userId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting Stream user ${userId}:`, error);
  }
};

export { chatClient, upsertStreamUser, deleteStreamUser };
