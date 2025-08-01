// ELEMENT SELECTORS
const chatbotLauncher = document.getElementById("chatbotLauncher");
const chatbotContainer = document.getElementById("chatbotContainer");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBody = document.getElementById("chatBody");
const typingIndicator = document.getElementById("typingIndicator");
const closeChat = document.getElementById("closeChat");
const homeBtn = document.getElementById("homeBtn");
const darkModeToggle = document.getElementById("darkModeToggle");

// TOGGLE CHATBOT VISIBILITY
chatbotLauncher.onclick = () => {
  chatbotContainer.style.display = "flex";
};

closeChat.onclick = () => {
  chatbotContainer.style.display = "none";
};

// DARK MODE TOGGLE
darkModeToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
};

// APPLY SAVED DARK MODE ON LOAD
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
  loadChatHistory();
});

// SMART BOT RESPONSES
const responses = [
  { keywords: ["hello", "hi", "hey"], reply: "Hello there! How can I help you today?" },
  { keywords: ["book", "room", "reservation"], reply: "Sure! What type of room would you like to book?" },
  { keywords: ["price", "cost", "rate"], reply: "Our prices vary depending on the room. Could you specify the type?" },
  { keywords: ["menu", "food", "restaurant"], reply: "You can view our restaurant menu on the homepage." },
  { keywords: ["location", "where"], reply: "We are located in Muyenga, Kampala, Uganda." },
  { keywords: ["services", "amenities"], reply: "We offer free Wi-Fi, breakfast, a pool, and more." },
  { keywords: ["thank", "thanks"], reply: "You're welcome! 😊" },
  { keywords: ["contact", "phone", "email"], reply: "You can contact us via the section below the chat." },
  { keywords: ["bye", "exit", "close"], reply: "Goodbye! Have a great day." },
  { keywords: ["reset", "home", "start"], reply: "Chat reset. How can I help you today?" },
  // Add more as needed
];

// FLEXIBLE MATCH FUNCTION
function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const pair of responses) {
    if (pair.keywords.some((word) => lower.includes(word))) {
      return pair.reply;
    }
  }
  return "I'm not sure how to respond to that. Could you rephrase?";
}

// ADD MESSAGE TO CHAT
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
  saveChatHistory();
}

// SAVE CHAT HISTORY
function saveChatHistory() {
  localStorage.setItem("chatHistory", chatBody.innerHTML);
}

// LOAD CHAT HISTORY
function loadChatHistory() {
  const saved = localStorage.getItem("chatHistory");
  if (saved) chatBody.innerHTML = saved;
}

// RESET CHAT
homeBtn.onclick = () => {
  chatBody.innerHTML = `<div class="message bot">Welcome back! How can I assist you today?</div>`;
  saveChatHistory();
};

// TYPING SIMULATION
function simulateTyping(reply) {
  typingIndicator.style.display = "block";
  setTimeout(() => {
    typingIndicator.style.display = "none";
    addMessage(reply, "bot");
  }, 1000 + Math.random() * 1000); // 1–2s delay
}

// SEND BUTTON CLICK
sendBtn.onclick = () => {
  const input = userInput.value.trim();
  if (input) {
    addMessage(input, "user");
    userInput.value = "";
    simulateTyping(getBotReply(input));
  }
};

// ENTER KEY SUBMIT
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});
