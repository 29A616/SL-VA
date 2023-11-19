const chatEndpoint = "/api/chat/";

const sendMessage = (message) => {
  const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

  return axios.post(chatEndpoint, {
    message,
  }, { headers: { 'X-CSRFToken': csrftoken } });
};

const appendMessage = (message, className) => {
  const messageDiv = document.createElement("div");
  const messageP = document.createElement("p");
  messageDiv.setAttribute("class", className);
  messageP.textContent = message;
  messageDiv.appendChild(messageP);
  document.querySelector(".chat-messages").appendChild(messageDiv);
};

const handleSubmit = (e) => {
  e.preventDefault();

  const message = document.getElementById("message").value;

  // Agregar el mensaje del usuario al HTML
  appendMessage(message, "userMessage");

  // Borra el input al realizar el submit
  document.querySelector("#message").value = "";

  sendMessage(message).then((response) => {
    // Agregar la respuesta del chatbot al HTML
    appendMessage(response.data, "IAMessage");

    const div = document.querySelector(".chat-messages");
    div.scrollTo(0, div.scrollHeight);
    document.querySelector("textarea#message").focus();
  });
};

const form = document.querySelector("#chat");
const textarea = document.querySelector("textarea#message");
const send = document.querySelector("a.btn");

textarea.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && !event.shiftKey) {
    handleSubmit(event);
  }
});

send.addEventListener("click", function (event) {
  handleSubmit(event);
});

form.addEventListener("submit", handleSubmit);
