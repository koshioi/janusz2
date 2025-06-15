
const input = document.getElementById("input");
const chat = document.getElementById("chat");

function appendMsg(sender, text) {
  const div = document.createElement("div");
  div.className = "msg " + sender;
  div.textContent = (sender === "user" ? "Ty: " : "Janusz: ") + text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage(text) {
  appendMsg("user", text);
  appendMsg("bot", "pisze...");

  try {
    const res = await fetch("/.netlify/functions/janusz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text })
    });
    const data = await res.json();
    document.querySelectorAll(".bot").pop().textContent = "Janusz: " + (data.text || "coś poszło nie tak");
  } catch (e) {
    document.querySelectorAll(".bot").pop().textContent = "Janusz: Błąd połączenia";
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = input.value.trim();
    if (text) {
      sendMessage(text);
      input.value = "";
    }
  }
});
