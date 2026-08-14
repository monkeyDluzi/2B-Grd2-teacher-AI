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
  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");

  const loadingId = showLoading();

  chatInput.disabled = true;
  sendButton.disabled = true;

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    removeLoading(loadingId);

    const data = await response.json();

    if (data.reply) {
      appendMessage("2B", data.reply);
    } else {
      appendMessage("2B", "Oops! Something went wrong.");
    }

  } catch (error) {
    removeLoading(loadingId);
    console.error("Error communicating with 2B backend:", error);
    appendMessage("2B", "Sorry, I can't connect to my brain server right now!");
  } finally {
    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
  }
}


function showLoading() {
  const chatMessages = document.getElementById("chatMessages");

  const messageDiv = document.createElement("div");
  messageDiv.className = "message received loading-message";
  messageDiv.id = "loading-" + Date.now();

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";

  const typingDiv = document.createElement("div");
  typingDiv.className = "typing-dots";
  typingDiv.innerHTML = "<span></span><span></span><span></span>";

  contentDiv.appendChild(typingDiv);
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;

  return messageDiv.id;
}


function removeLoading(id) {
  const el = document.getElementById(id);
  if (el) {
    el.remove();
  }
}


// -------------------------------------------------------------
// STEP 5: DRAW CHAT BUBBLES IN YOUR HTML CHAT BOX
// -------------------------------------------------------------
function appendMessage(sender, text) {
  const chatMessages = document.getElementById("chatMessages");

  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "2B" ? "message received" : "message sent";

  const contentDiv = document.createElement("div");
  contentDiv.className = "message-content";

  const paragraph = document.createElement("p");
  paragraph.textContent = text;

  contentDiv.appendChild(paragraph);
  messageDiv.appendChild(contentDiv);
  chatMessages.appendChild(messageDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}
