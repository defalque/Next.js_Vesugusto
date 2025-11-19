import { createSupabaseUser, deleteSupabaseUser } from "@/app/_lib/actions";
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req);

    const { id } = evt.data;

    if (evt.type === "user.created") {
      const { first_name, last_name, email_address, image_url } =
        evt.data.external_accounts.at(0);

      const user = {
        email: email_address,
        firstName: first_name,
        lastName: last_name,
        image: image_url,
        userId: id,
      };
      await createSupabaseUser(user);
    }

    if (evt.type === "user.deleted") {
      await deleteSupabaseUser(id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
