const API_KEY = "AIzaSyDNmMzJ4olYObOT-MbbTKz0-lO1eS69_Xg";

async function sendMessage() {

    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");

    const userMessage = input.value.trim();
    if (!userMessage) return;

    chat.innerHTML += `<p><b>Вы:</b> ${userMessage}</p>`;
    input.value = "";

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${AIzaSyDNmMzJ4olYObOT-MbbTKz0-lO1eS69_Xg}`,
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

        console.log(data);

        const botReply =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "AI не смог ответить";

        chat.innerHTML += `<p><b>Бот:</b> ${botReply}</p>`;

    } catch (error) {

        console.error(error);
        chat.innerHTML += `<p><b>Ошибка:</b> не удалось связаться с AI</p>`;

    }

    chat.scrollTop = chat.scrollHeight;
}


