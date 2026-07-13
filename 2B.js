const text = "welcome to 2B";
const title = document.getElementById("title");

let i = 0;

function typeWriter() {
  if (i < text.length) {
    title.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

window.addEventListener("load", typeWriter);

const logo = document.getElementById("logo");
const isInPagesFolder = window.location.pathname.includes("/pages/");

const backgrounds = [
  isInPagesFolder ? "../images/AI.gif" : "images/AI.gif",
  isInPagesFolder ? "../images/lol.gif" : "images/lol.gif",
  isInPagesFolder ? "../images/6767.gif" : "images/6767.gif",
  isInPagesFolder ? "../images/8989.gif" : "images/8989.gif"
];

let index = 0;

logo.addEventListener("click", () => {
  index++;

  if (index >= backgrounds.length) {
    index = 0;
  }

  document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
});

function goMain() {
  window.location.href = isInPagesFolder ? "main.html" : "pages/main.html";
}

const continueButton = document.getElementById("continue");
continueButton.addEventListener("click", goMain);

