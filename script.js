
const input = document.getElementById('userInput');
const chat = document.getElementById('chat');

input.addEventListener('keydown', async function (e) {
  if (e.key === 'Enter') {
    const message = input.value.trim();
    if (!message) return;
    chat.innerHTML += `<div><b>Ty:</b> ${message}</div>`;
    chat.innerHTML += `<div><b>Janusz:</b> pisze...</div>`;
    input.value = '';

    const res = await fetch('/.netlify/functions/janusz', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });

    try {
      const data = await res.json();
      const nodes = chat.querySelectorAll("div");
      nodes[nodes.length - 1].innerHTML = `<b>Janusz:</b> ${data.reply}`;
    } catch {
      const nodes = chat.querySelectorAll("div");
      nodes[nodes.length - 1].innerHTML = `<b>Janusz:</b> Błąd połączenia`;
    }

    chat.scrollTop = chat.scrollHeight;
  }
});
