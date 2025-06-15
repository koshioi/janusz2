
export default async (request) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Tylko POST!" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body = await request.json();
  const prompt = body.prompt || "coś";

  const odpowiedzi = [
    "To wina iluminatów!",
    "Gołębie to drony, przecież wiadomo.",
    "Koty to kamery UFO.",
    "5G steruje pogodą.",
    "Krzyżacy to byli kosmici.",
    `"${prompt}"? Typowe pranie mózgu przez system.`,
    `"${prompt}"? Znam typa, co tak miał. Skończył w lesie z aluminiową czapką.`
  ];

  const message = odpowiedzi[Math.floor(Math.random() * odpowiedzi.length)];

  return new Response(JSON.stringify({ message }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
