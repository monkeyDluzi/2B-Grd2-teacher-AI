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
