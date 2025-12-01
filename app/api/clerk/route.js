import {
  createSupabaseUser,
  deleteSupabaseUser,
  updateSupabaseUser,
} from "@/app/_lib/actions";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;

    if (evt.type === "user.created") {
      const user = {
        email: evt.data.email_addresses.at(0).email_address,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
        image:
          evt.data.external_accounts.at(0)?.image_url ?? evt.data.image_url,
        userId: id,
      };
      const { user_id, cart_id } = await createSupabaseUser(user);

      const client = await clerkClient();

      await client.users.updateUserMetadata(id, {
        privateMetadata: {
          databaseId: user_id,
          cartId: cart_id,
        },
      });
    }

    if (evt.type === "user.deleted") {
      await deleteSupabaseUser(id);
    }

    if (evt.type === "user.updated") {
      const updatedUser = {
        email: evt.data.email_addresses.at(0).email_address,
        firstName: evt.data.first_name,
        lastName: evt.data.last_name,
        image:
          evt.data.external_accounts.at(0)?.image_url ?? evt.data.image_url,
        userId: id,
      };
      await updateSupabaseUser(updatedUser);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
