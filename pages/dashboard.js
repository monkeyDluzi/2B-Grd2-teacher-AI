logo.addEventListener("click", () => {
    location.reload();
});
// ================================
// 🔥 STREAK SYSTEM
// ================================

const streakCount = document.querySelector(".streak-count");

let streak = Number(localStorage.getItem("streak")) || 0;
let lastVisit = localStorage.getItem("lastVisit");

const today = new Date().toDateString();

if (lastVisit !== today) {
    streak++;

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastVisit", today);
}

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
