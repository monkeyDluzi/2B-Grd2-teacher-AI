document.addEventListener("DOMContentLoaded", () => {

// ================================
// 🔥 STREAK SYSTEM
// ================================

const streakCount = document.querySelector(".streak-count");

let streak = Number(localStorage.getItem("streak")) || 0;
let lastVisit = localStorage.getItem("lastVisit");

const today = new Date().toDateString();
const yesterday = new Date(Date.now() - 86400000).toDateString();

if (!lastVisit) {
    streak = 1;
} else if (lastVisit === today) {
    streak = streak;
} else if (lastVisit === yesterday) {
    streak++;
} else {
    streak = 1;
}

localStorage.setItem("streak", streak);
localStorage.setItem("lastVisit", today);

streakCount.textContent = streak;


// ================================
// 🏪 SHOP OVERLAY
// ================================

const shopButton = document.querySelector(".shop-button");
const shopOverlay = document.getElementById("shopOverlay");
const closeShop = document.getElementById("closeShop");


// Open shop
shopButton.addEventListener("click", () => {
    shopOverlay.classList.add("show");
});


// Close shop
closeShop.addEventListener("click", () => {
    shopOverlay.classList.remove("show");
});


// Close if clicking outside the shop
shopOverlay.addEventListener("click", (event) => {
    if (event.target === shopOverlay) {
        shopOverlay.classList.remove("show");
    }
});

// ================================
// 🎓 GRADE SELECTION
// ================================

const profileIcon = document.querySelector(".profile-icon");

const gradeOverlay = document.getElementById("gradeOverlay");

const closeGrade = document.getElementById("closeGrade");

const gradeButtons = document.querySelectorAll(".grade-button");

const selectedGrade = document.getElementById("selectedGrade");

function getCurrentGrade() {
    return localStorage.getItem("studentGrade");
}

function highlightCurrentGrade() {
    const currentGrade = getCurrentGrade();
    gradeButtons.forEach((button) => {
        button.classList.toggle("selected", button.dataset.grade === currentGrade);
    });
    if (currentGrade) {
        selectedGrade.textContent = `My grade is Grade ${currentGrade}`;
    } else {
        selectedGrade.textContent = "No grade selected";
    }
}

// Open grade overlay
profileIcon.addEventListener("click", () => {
    highlightCurrentGrade();
    gradeOverlay.classList.add("show");
});


// Close grade overlay
closeGrade.addEventListener("click", () => {
    gradeOverlay.classList.remove("show");
});


// Select a grade
gradeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const grade = button.dataset.grade;

        localStorage.setItem("studentGrade", grade);

        gradeButtons.forEach((otherButton) => {
            otherButton.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedGrade.textContent = `My grade is Grade ${grade}`;

        setTimeout(() => {
            gradeOverlay.classList.remove("show");
        }, 400);
    });
    });


    // Close when clicking outside the modal
    gradeOverlay.addEventListener("click", (event) => {
        if (event.target === gradeOverlay) {
            gradeOverlay.classList.remove("show");
        }
    });

});
