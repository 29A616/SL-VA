const chatEndpoint = "/api/chat/";

const sendMessage = async (message) => {
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

const showTypingMessage = () => {
  // Mostrar el mensaje temporal de "escribiendo..."
  appendMessage("Escribiendo...", "IAMessage typing");
};

const clearTypingMessage = () => {
  // Eliminar el mensaje temporal de "escribiendo..."
  const typingMessageDiv = document.querySelector(".IAMessage.typing");
  if (typingMessageDiv) {
    typingMessageDiv.remove();
  }
};

const showError = () => {
  // Mostrar un mensaje de error si no se recibe respuesta en 2 minutos
  appendMessage("Error al recibir respuesta del Asistente. Recargar la página e intentar de nuevo. Si el problema persiste, contactar con el administrador.", "IAMessage error");
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const message = document.getElementById("message").value;

  // Verificar si el mensaje está vacío
  if (message.trim() === "") {
    // Puedes mostrar un mensaje al usuario indicando que el campo está vacío
    alert("Por favor, ingrese un mensaje antes de enviar.");
    return;
  }

  // Agregar el mensaje del usuario al HTML
  appendMessage(message, "userMessage");

  // Mostrar el mensaje temporal de "escribiendo..."
  showTypingMessage();

  try {
    const response = await Promise.race([sendMessage(message), new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 120000))]);

    // Eliminar el mensaje temporal de "escribiendo..."
    clearTypingMessage();

    // Agregar la respuesta del chatbot al HTML
    appendMessage(response.data, "IAMessage");

    // Limpiar el contenido del textarea después de enviar el mensaje
    document.getElementById("message").value = "";

    const div = document.querySelector(".chat-messages");
    div.scrollTo(0, div.scrollHeight);
    document.querySelector("textarea#message").focus();
  } catch (error) {
    console.error("Error al enviar el mensaje:", error);
    // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
    // También puedes considerar mostrar el mensaje de error aquí

    // Eliminar el mensaje temporal de "escribiendo..."
    clearTypingMessage();

    // Mostrar el mensaje de error en lugar del "escribiendo..."
    showError();
  }
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
