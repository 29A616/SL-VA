var btnMode = document.getElementById('mode');
var btnModeBall = document.querySelector('.mode div');
var body = document.body;

// Función para establecer la preferencia del tema en una cookie
function setThemePreference(theme) {
  document.cookie = "theme=" + theme + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

// Función para obtener la preferencia del tema desde la cookie
function getThemePreference() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith("theme=")) {
      return cookie.substring("theme=".length);
    }
  }
  return null;
}

// Obtén la preferencia del tema almacenada en la cookie
const savedTheme = getThemePreference();

// Aplica el tema guardado (o el predeterminado) al cargar la página
const defaultTheme = savedTheme || "light";
applyTheme(defaultTheme);

// Función para cambiar el tema y guardar la preferencia en la cookie
function toggleTheme() {
  const currentTheme = getThemePreference();
  const newTheme = currentTheme === "light" ? "dark" : "light";
  applyTheme(newTheme);
  setThemePreference(newTheme);
}

// Función para aplicar el tema
function applyTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
  body.classList.toggle("light", theme === "light");
  btnModeBall.style.left = theme === "dark" ? "-1px" : "unset";
  btnModeBall.style.right = theme === "dark" ? "unset" : "-1px";
}

// Asigna el evento de clic al interruptor de modo
btnMode.addEventListener("click", toggleTheme);

