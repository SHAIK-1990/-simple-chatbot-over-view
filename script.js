function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // Display user message
    let userMessage = document.createElement("p");
    userMessage.className = "user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Scroll to the latest message
    chatBox.scrollTop = chatBox.scrollHeight;

    // Generate bot response
    setTimeout(() => {
        let botMessage = document.createElement("p");
        botMessage.className = "bot-message";
        botMessage.textContent = getBotResponse(userInput);
        chatBox.appendChild(botMessage);

        // Scroll to the latest message
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);
}
function startVoiceRecognition() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onstart = function () {
        console.log("Voice recognition started...");
    };

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript;
        document.getElementById("user-input").value = transcript;
        sendMessage(); // Auto-send message
    };

    recognition.start();
}

// Simple bot responses
function getBotResponse(input) {
    input = input.toLowerCase();

    let responses = {
        "hello": "Hi there! How can I help you?",
        "how are you": "I'm just a bot, but I'm doing great! How about you?",
        "what is your name": "I'm a simple chatbot created by you!",
        "bye": "Goodbye! Have a great day!",
        "thanks": "You're welcome!"
        
    };

    return responses[input] || "Sorry, I don't understand that.";
}

// Allow sending messages with Enter key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});