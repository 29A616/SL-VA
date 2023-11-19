const chatEndpoint = "/api/chat/";

const sendMessage = (message) => {
  const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

  return axios.post(chatEndpoint, {
    message,
  }, { headers: { 'X-CSRFToken': csrftoken } });
};

const handleSubmit = (e) => {
  e.preventDefault();

  const message = document.getElementById("message").value;

  // Agregar el mensaje del usuario al HTML
  const userMessage = document.createElement("div");
  const userMessage0 = document.createElement("p");
  userMessage.setAttribute("class", "userMessage");
  userMessage0.textContent = message;
  document.querySelector(".chat-messages").appendChild(userMessage);
  document.querySelector(".userMessage").appendChild(userMessage0);

  // Borra el input al realizar el submit
  document.querySelector("#message").value = "";

  sendMessage(message).then((response) => {
    // Agregar la respuesta del chatbot al HTML
    const chatMessage = document.createElement("div");
    const chatMessage0 = document.createElement("p");
    chatMessage.setAttribute("class", "IAMessage");
    chatMessage0.textContent = response.data;
    document.querySelector(".chat-messages").appendChild(chatMessage);
    document.querySelector(".IAMessage").appendChild(chatMessage0);
    const div = document.querySelector(".chat-messages");
    document.querySelector(".chat-messages").scrollTo(0, div.scrollHeight) 
    document.querySelector("textarea#message").focus();
  });
};

const form = document.querySelector("#chat");

const textarea = document.querySelector("textarea#message");

const send = document.querySelector("a.btn");

textarea.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    handleSubmit(event);
  };
});

send.addEventListener("click", function(event) {
  if (event.keyCode === 13 || event === "click") {
    handleSubmit(event)
  };
});

form.addEventListener("submit", handleSubmit);