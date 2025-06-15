
const fetch = require('node-fetch');

exports.handler = async function (event) {
  const userMessage = JSON.parse(event.body).message;

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: {
          text: userMessage,
        },
      }),
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Błąd po stronie AI: ${response.statusText}` }),
      };
    }

    const data = await response.json();
    const botResponse = data.generated_text || "Nie wiem, ale i tak to spisek.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: `Janusz: ${botResponse}` }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Błąd Janusza: ${error.message}` }),
    };
  }
};
