document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("onboardingForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const grade = document.getElementById("studentGrade").value;

    if (!name || !grade) return;

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentGrade", grade);

    window.location.href = "../html/dashboard.html";
  });
});
