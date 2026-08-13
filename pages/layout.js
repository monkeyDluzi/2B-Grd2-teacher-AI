const headerHTML = `
    <div class="header-container">
      <div class="logo-section">
        <img id="logo" src="../images/IMG_0420.jpeg" alt="2B AI Teacher Logo" tabindex="0" role="button" aria-label="2B AI Teacher Logo - Click for animation">
      </div>
      <nav class="nav" role="navigation" aria-label="Main navigation">
        <a href="main.html" class="nav-link" aria-label="Navigate to home page">Home</a>
        <a href="chat.html" class="nav-link" aria-label="Navigate to 2B chat section">2B Section</a>
        <a href="dashboard.html" class="nav-link" aria-label="Navigate to Dashboard section">Dashboard</a>
      </nav>
    </div>
`;

const footerHTML = `
    <div class="footer-content">
      <div class="footer-section">
        <h4>2B AI Teacher</h4>
        <p>Making learning fun for students</p>
      </div>
      <div class="footer-section">
        <h4>Quick Links</h4>
        <a href="main.html" aria-label="Navigate to home page">Back to Home</a>
        <a href="chat.html" aria-label="Navigate to main page">2B AI</a>
        <a href="dashboard.html" aria-label="Navigate to main page">Dashboard</a>
      </div>
      <div class="footer-section">
        <h4>Ontario Curriculum</h4>
        <p>Aligned with Ontario learning standards</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 2B-Grd2-teacher-AI | Created by Luzi, and Santiago</p>
    </div>
`;


const headerHTMLDashboard = `
    <div class="header-container">
                <div class="header-left">
                    <div class="logo-section">
                        <img id="logo" src="../images/IMG_0420.jpeg" alt="2B AI Teacher Logo" tabindex="0" role="button" aria-label="2B AI Teacher Logo - Click for animation">
                    </div>
                    <nav class="nav" role="navigation" aria-label="Main navigation">
                        <button class="nav-button" aria-label="Navigate to Dashboard">Dashboard</button>
                        <button class="nav-button" aria-label="Navigate to Practice">Practice</button>
                        <button class="nav-button" aria-label="Navigate to Skills">Skills</button>
                    </nav>
                </div>
                <div class="user-info">
                    <div class="coin-display">
                        <span class="coin-emoji">🪙</span>
                        <span class="coin-count">0</span>
                    </div>
                    <div class="profile-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="User profile">
                            <circle cx="12" cy="8" r="4" fill="#667eea"/>
                            <path d="M12 14C8.68629 14 6 16.6863 6 20V21H18V20C18 16.6863 15.3137 14 12 14Z" fill="#667eea"/>
                        </svg>
                    </div>
                </div>
    </div>
`;

const footerHTMLDashboard = `
    <div class="footer-content">
            <div class="footer-section">
                <h4>2B AI Teacher</h4>
                <p>Making learning fun for students</p>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <a href="main.html" aria-label="Navigate to home page">Back to Home</a>
                <a href="chat.html" aria-label="Navigate to main page">2B AI</a>
                <a href="dashboard.html" aria-label="Navigate to main page">Dashboard</a>
            </div>
            <div class="footer-section">
                <h4>Ontario Curriculum</h4>
                <p>Aligned with Ontario learning standards</p>
            </div>
            </div>
            <div class="footer-bottom">
            <p>&copy; 2026 2B-Grd2-teacher-AI | Created by Luzi, and Santiago</p>
    </div>
`;



document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.querySelector(".header");
    const footerContainer = document.querySelector(".footer");

    // Check if the current file name is dashboard.html
    const isDashboard = window.location.pathname.includes("dashboard.html");

    if (headerContainer) {
        // Use dashboard template if on dashboard page, else use regular template
        headerContainer.innerHTML = isDashboard ? headerHTMLDashboard : headerHTML;
    }

    if (footerContainer) {
        // Use dashboard template if on dashboard page, else use regular template
        footerContainer.innerHTML = isDashboard ? footerHTMLDashboard : footerHTML;
    }
});
