let lastTopic = null;
let userName = null;

const replies = {
    greeting: [
        "Привет 🤍 Я рядом. Как ты сейчас?",
        "Привет. Рад, что ты написал.",
        "Я здесь. Хочешь поговорить?"
    ],

    sadness: [
        "Мне правда жаль, что тебе так тяжело.",
        "Это звучит больно…",
        "Похоже, тебе сейчас непросто.",
        "Я рядом с тобой в этом."
    ],

    loneliness: [
        "Одиночество может ощущаться очень остро.",
        "Даже если кажется, что ты один — сейчас ты не один.",
        "Иногда просто хочется, чтобы кто-то был рядом."
    ],

    anxiety: [
        "Тревога может сильно выматывать.",
        "Давай немного замедлимся.",
        "Ты в безопасности прямо сейчас."
    ],

    anger: [
        "Похоже, в тебе много злости.",
        "Это действительно может выбивать из колеи.",
        "Ты имеешь право так чувствовать."
    ],

    meaning: [
        "Такие мысли часто приходят, когда очень тяжело.",
        "Ты не обязан находить ответы сразу.",
        "Твоя жизнь важна, даже если сейчас это не чувствуется."
    ],

    default: [
        "Я тебя слышу.",
        "Можешь рассказать об этом чуть подробнее?",
        "Я здесь, продолжай.",
        "Мне важно тебя понять."
    ],

    followUp: {
        sadness: [
            "Что именно сейчас ранит больше всего?",
            "Это давно с тобой или что-то произошло недавно?"
        ],
        anxiety: [
            "Это про будущее или про то, что уже случилось?",
            "Тревога сильная или волнами?"
        ],
        loneliness: [
            "Ты давно чувствуешь себя одиноко?",
            "Есть ли кто-то, по кому ты сейчас скучаешь?"
        ],
        anger: [
            "Это связано с конкретным человеком?",
            "Ты больше злишься или чувствуешь бессилие?"
        ]
    }
};

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function detectTopic(msg) {
    if (/(груст|плохо|больно|печал)/.test(msg)) return "sadness";
    if (/(один|одиноко|никто)/.test(msg)) return "loneliness";
    if (/(тревог|страшно|боюсь|нерв)/.test(msg)) return "anxiety";
    if (/(злюсь|бесит|раздраж)/.test(msg)) return "anger";
    if (/(зачем жить|смысл)/.test(msg)) return "meaning";
    if (/(привет|здравств)/.test(msg)) return "greeting";
    return "default";
}

function generateSupportAnswer(text) {
    const msg = text.toLowerCase();
    const topic = detectTopic(msg);
    lastTopic = topic;

    let answer = random(replies[topic] || replies.default);

    // иногда добавляем уточняющий вопрос
    if (replies.followUp[topic] && Math.random() > 0.5) {
        answer += " " + random(replies.followUp[topic]);
    }

    return answer;
}

function showTyping(chat) {
    const typing = document.createElement("div");
    typing.className = "message ai";
    typing.id = "typing";
    typing.innerText = "…печатает";
    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const text = input.value.trim();
    if (!text) return;

    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.innerText = text;
    chat.appendChild(userMessage);

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    showTyping(chat);

    const delay = 800 + Math.random() * 800;

    setTimeout(() => {
        removeTyping();
        const aiMessage = document.createElement("div");
        aiMessage.className = "message ai";
        aiMessage.innerText = generateSupportAnswer(text);
        chat.appendChild(aiMessage);
        chat.scrollTop = chat.scrollHeight;
    }, delay);
}
