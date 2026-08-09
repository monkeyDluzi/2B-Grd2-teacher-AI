// -------------------------------------------------------------
// STEP 1: DEFINE THE SERVER ADDRESS
// -------------------------------------------------------------
// Points to your running Python backend server
const BACKEND_URL = "https://2b-grd2-teacher-ai.onrender.com/api/chat";

// -------------------------------------------------------------
// STEP 2: WAIT FOR THE WEB PAGE TO LOAD
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Find the button, input box, and message container on your HTML page
  const sendButton = document.getElementById("sendButton");
  const chatInput = document.getElementById("chatInput");

  // Listen for clicks on the "Send" button
  sendButton.addEventListener("click", () => {
    handleSend();
  });

  // Listen for the "Enter" key press inside the text box
  chatInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  });
});


// -------------------------------------------------------------
// STEP 3: HANDLE SENDING THE USER's TEXT
// -------------------------------------------------------------
function handleSend() {
  const chatInput = document.getElementById("chatInput");
  const messageText = chatInput.value.trim();

  // Don't send empty messages
  if (messageText === "") return;

  // Clear the input box for the next message
  chatInput.value = "";

  // Call the function that talks to Python
  sendMessageTo2B(messageText);
}


// -------------------------------------------------------------
// STEP 4: TALK TO THE PYTHON BACKEND
// -------------------------------------------------------------
async function sendMessageTo2B(userText) {
  // 1. Show student's message on screen
  appendMessage("user", userText);

  try {
    // 2. Send request to Python server
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();

    // 3. Show 2B's answer on screen
    if (data.reply) {
      appendMessage("2B", data.reply);
    } else {
      appendMessage("2B", "Oops! Something went wrong.");
    }

  } catch (error) {
    console.error("Error communicating with 2B backend:", error);
    appendMessage("2B", "Sorry, I can't connect to my brain server right now!");
  }
}


// -------------------------------------------------------------
// STEP 5: DRAW CHAT BUBBLES IN YOUR HTML CHAT BOX
// -------------------------------------------------------------
function appendMessage(sender, text) {
  // Find your existing chat messages div (<div id="chatMessages">)
  const chatMessages = document.getElementById("chatMessages");

  // Create outer div (<div class="message ...">)
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "2B" ? "message received" : "message sent";

  // Create inner content div (<div class="message-content">)
  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";

  // Add message text inside
  contentDiv.innerHTML = `<p>${text}</p>`;

  // Assemble the elements together
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);

  // Automatically scroll down to the newest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
}