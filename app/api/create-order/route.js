import { createOrder } from "@/app/_lib/actions";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId, cartId, paymentIntentId } = await request.json();

  if (!userId || !cartId || !paymentIntentId) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  try {
    await createOrder(userId, cartId, paymentIntentId);
    console.log("✅ Ordine creato con successo!");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Errore creazione ordine:", err);
    return NextResponse.json(
      { error: "Errore nel salvataggio ordine" },
      { status: 500 }
    );
  }
}
