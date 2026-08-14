document.addEventListener("DOMContentLoaded", () => {
  // Setup navigation buttons
  setupNavigation();

  // Get student's grade from localStorage
  const studentGrade = localStorage.getItem("studentGrade");
  
  // Display current grade
  const gradeDisplay = document.getElementById("currentGrade");
  if (studentGrade) {
    gradeDisplay.textContent = `Grade ${studentGrade}`;
  } else {
    gradeDisplay.textContent = "Not set";
    // Redirect to onboarding if no grade is set
    setTimeout(() => {
      window.location.href = "../html/onboarding.html";
    }, 2000);
  }

  // Populate theme previews for each subject
  populateThemePreviews(studentGrade);

  // Setup subject card click handlers
  setupSubjectCards(studentGrade);

  // Setup modal close functionality
  setupModalClose();
});

function setupNavigation() {
  const navButtons = document.querySelectorAll(".nav-button");
  navButtons.forEach(button => {
    button.addEventListener("click", () => {
      const buttonText = button.textContent.trim();
      
      switch(buttonText) {
        case "Dashboard":
          window.location.href = "../html/dashboard.html";
          break;
        case "Practice":
          // Already on practice page, do nothing
          break;
        case "Skills":
          // Skills page not implemented yet
          showMessage("Skills page coming soon!");
          break;
      }
    });
  });
}

function populateThemePreviews(grade) {
  if (!grade || !ontarioCurriculum[grade]) return;

  const gradeCurriculum = ontarioCurriculum[grade];

  // Populate math themes preview
  const mathThemesContainer = document.getElementById("math-themes");
  if (mathThemesContainer && gradeCurriculum.math) {
    mathThemesContainer.innerHTML = gradeCurriculum.math
      .slice(0, 3)
      .map(theme => `<span class="theme-tag">${theme}</span>`)
      .join('');
    if (gradeCurriculum.math.length > 3) {
      mathThemesContainer.innerHTML += `<span class="theme-tag">+${gradeCurriculum.math.length - 3} more</span>`;
    }
  }

  // Populate language themes preview
  const languageThemesContainer = document.getElementById("language-themes");
  if (languageThemesContainer && gradeCurriculum.language) {
    languageThemesContainer.innerHTML = gradeCurriculum.language
      .slice(0, 3)
      .map(theme => `<span class="theme-tag">${theme}</span>`)
      .join('');
    if (gradeCurriculum.language.length > 3) {
      languageThemesContainer.innerHTML += `<span class="theme-tag">+${gradeCurriculum.language.length - 3} more</span>`;
    }
  }

  // Populate science themes preview
  const scienceThemesContainer = document.getElementById("science-themes");
  if (scienceThemesContainer && gradeCurriculum.science) {
    scienceThemesContainer.innerHTML = gradeCurriculum.science
      .slice(0, 3)
      .map(theme => `<span class="theme-tag">${theme}</span>`)
      .join('');
    if (gradeCurriculum.science.length > 3) {
      scienceThemesContainer.innerHTML += `<span class="theme-tag">+${gradeCurriculum.science.length - 3} more</span>`;
    }
  }
}

function setupSubjectCards(grade) {
  const subjectCards = document.querySelectorAll(".subject-card");
  
  subjectCards.forEach(card => {
    const selectBtn = card.querySelector(".select-subject-btn");
    const subject = card.dataset.subject;
    
    selectBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openThemeModal(subject, grade);
    });

    // Also make the whole card clickable
    card.addEventListener("click", () => {
      openThemeModal(subject, grade);
    });
  });
}

function openThemeModal(subject, grade) {
  if (!grade || !ontarioCurriculum[grade] || !ontarioCurriculum[grade][subject]) {
    console.error("Invalid grade or subject");
    return;
  }

  const themes = ontarioCurriculum[grade][subject];
  const modal = document.getElementById("themeModal");
  const modalTitle = document.getElementById("modalSubjectTitle");
  const modalDescription = document.getElementById("modalSubjectDescription");
  const themesGrid = document.getElementById("themesGrid");

  // Set modal content
  const subjectNames = {
    math: "Math",
    language: "Language", 
    science: "Science"
  };

  const subjectDescriptions = {
    math: "Choose a math topic to practice",
    language: "Choose a language arts topic to practice",
    science: "Choose a science topic to explore"
  };

  modalTitle.textContent = `${subjectNames[subject]} - Grade ${grade}`;
  modalDescription.textContent = subjectDescriptions[subject];

  // Clear and populate themes grid
  themesGrid.innerHTML = "";
  
  themes.forEach((theme, index) => {
    const themeItem = document.createElement("div");
    themeItem.className = "theme-item";
    themeItem.style.animationDelay = `${index * 0.1}s`;
    
    const themeTitle = document.createElement("h3");
    themeTitle.textContent = theme;
    
    themeItem.appendChild(themeTitle);
    
    themeItem.addEventListener("click", () => {
      selectTheme(subject, theme, grade);
    });
    
    themesGrid.appendChild(themeItem);
  });

  // Show modal
  modal.classList.add("show");
}

function setupModalClose() {
  const modal = document.getElementById("themeModal");
  const closeBtn = document.getElementById("closeThemeModal");

  closeBtn.addEventListener("click", closeThemeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeThemeModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeThemeModal();
    }
  });
}

function closeThemeModal() {
  const modal = document.getElementById("themeModal");
  modal.classList.remove("show");
}

function selectTheme(subject, theme, grade) {
  // Store the selected subject and theme
  localStorage.setItem("selectedSubject", subject);
  localStorage.setItem("selectedTheme", theme);
  
  // For now, just close the modal and show an alert
  // In the future, this would navigate to a lesson/quiz page
  closeThemeModal();
  
  // Show a temporary message
  showMessage(`You selected ${theme} in ${subject}! This feature is coming soon.`);
}

function showMessage(message) {
  // Create a temporary toast message
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

