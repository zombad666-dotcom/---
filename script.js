const API_KEY = "AIzaSyDNmMzJ4olYObOT-MbbTKz0-lO1eS69_Xg";

async function sendMessage() {

    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");

    const userMessage = input.value;

    if (!userMessage) return;

    // сообщение пользователя
    chat.innerHTML += "<p><b>Вы:</b> " + userMessage + "</p>";

    input.value = "";

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: userMessage }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    const botReply = data.candidates[0].content.parts[0].text;

    // ответ бота
    chat.innerHTML += "<p><b>Бот:</b> " + botReply + "</p>";

    chat.scrollTop = chat.scrollHeight;
}

