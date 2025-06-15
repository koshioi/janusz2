
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { message } = JSON.parse(event.body);
    const response = await fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-rw-1b", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: "Użytkownik: " + message + "\nJanusz:" }),
    });

    const result = await response.json();
    const text = result?.[0]?.generated_text?.split("Janusz:")[1] || "Coś podejrzanego w tych bitach...";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: text.trim() })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Błąd generowania odpowiedzi przez AI." })
    };
  }
};
