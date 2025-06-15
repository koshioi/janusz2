
const fetch = require('node-fetch');
require('dotenv').config();

exports.handler = async function(event, context) {
  const { prompt } = JSON.parse(event.body || "{}");

  const systemPrompt = "Odpowiadasz jako Janusz, paranoiczny fan teorii spiskowych. Zawsze odpowiadaj przekonany, że wszystkie dziwne teorie są prawdziwe. Nie zmieniaj zdania. Bądź śmieszny.";
  const userPrompt = `${systemPrompt}\nUżytkownik: ${prompt}\nJanusz:`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.JANUSZ_AI_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: userPrompt, parameters: { max_new_tokens: 100 } })
    });

    const result = await response.json();
    const text = result[0]?.generated_text?.split("Janusz:").pop().trim() || "Nie wiem, ale to na pewno UFO.";

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Błąd serwera" })
    };
  }
};
