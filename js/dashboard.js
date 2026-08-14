document.addEventListener("DOMContentLoaded", () => {

// ================================
// 🧭 NAVIGATION BUTTONS
// ================================

const navButtons = document.querySelectorAll(".nav-button");
navButtons.forEach(button => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent.trim();
        
        switch(buttonText) {
            case "Dashboard":
                // Already on dashboard, do nothing
                break;
            case "Practice":
                window.location.href = "../html/practice.html";
                break;
            case "Skills":
                // Skills page not implemented yet
                showMessage("Skills page coming soon!");
                break;
        }
    });
});

function showMessage(message) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-primary);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 2000;
        animation: fadeInUp 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

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
