import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "oneseat",
});

const syncUser = inngest.createFunction(
  {
    id: "sync-user",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const { id, email_addresses, image_url, first_name, last_name, username } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      profileImage: image_url || "",
      name: `${first_name} ${last_name}`,
      username: username || "",
    };

    const user = await User.create(newUser);
    return user;
  }
);

const deleteUser = inngest.createFunction(
  {
    id: "delete-user",
  },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
    return { success: true };
  }
);

export const inngestFunctions = [syncUser, deleteUser];
