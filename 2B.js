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

const backgrounds = [
  "images/AI.gif",
  "images/aib4.jpg",
  "images/aib5.jpeg",
  "images/aib7.jpg"
];

let index = 0;

logo.addEventListener("click", () => {
  index++;

  if (index >= backgrounds.length) {
    index = 0;
  }

  document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
});
