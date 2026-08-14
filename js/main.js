document.addEventListener('DOMContentLoaded', function() {
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', function() {
      this.style.animation = 'none';
      this.offsetHeight;
      this.style.animation = 'bounce 0.5s ease 3';
      
      setTimeout(() => {
        this.style.animation = '';
      }, 1500);
    });
  }

  const getStartedBtn = document.querySelector('.get-started-btn');
  if (getStartedBtn) {
    const hasProfile = localStorage.getItem('studentName') && localStorage.getItem('studentGrade');
    if (hasProfile) {
      getStartedBtn.textContent = 'Continue to Dashboard';
      getStartedBtn.href = '../html/dashboard.html';
    }
  }
});
