const chatEndpoint = "/api/chat/";

const sendMessage = (message) => {
  return axios.post(chatEndpoint, {
    message,
  });
};

const handleSubmit = (e) => {
  e.preventDefault();

  const message = document.getElementById("message").value;

  // Agregar el mensaje del usuario al HTML
  const userMessage = document.createElement("p");
  userMessage.setAttribute("class", "userMessage");
  userMessage.textContent = message;
  document.querySelector(".chat-messages").appendChild(userMessage);

  // Borra el input al realizar el submit
  document.querySelector("#message").value = "";

  sendMessage(message).then((response) => {
    // Agregar la respuesta del chatbot al HTML
    const chatMessage = document.createElement("p");
    chatMessage.setAttribute("class", "IAMessage");
    chatMessage.textContent = response.data;
    document.querySelector(".chat-messages").appendChild(chatMessage);
    const div = document.querySelector(".chat-messages")
    document.querySelector(".chat-messages").scrollTo(0, div.scrollHeight) 
    document.querySelector("textarea#message").focus();
  });
};

const form = document.querySelector("form");

const textarea = document.querySelector("textarea#message");

textarea.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    handleSubmit(event);
  }
})

form.addEventListener("submit", handleSubmit);

const input = [
  document.querySelector("textarea[name=A]"),
  document.querySelector("input[name=B]"),
];

window.addEventListener("load", function () {
  // input[0].disabled = false;
  input[1].disabled = false;
  document.querySelector("textarea#message").focus();
});