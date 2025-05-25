export async function POST(request) {
  const { message } = await request.json();
  const apiKey = process.env.GEMINI_API_KEY;

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
      apiKey,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: message }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("Errore Gemini:", err);
    return new Response(JSON.stringify({ error: "Errore dalla Gemini API" }), {
      status: 500,
    });
  }

  const data = await response.json();
  const reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Nessuna risposta";

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
