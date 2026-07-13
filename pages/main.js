document.addEventListener('DOMContentLoaded', function() {
  // Logo click interaction
  const logo = document.getElementById('logo');
  if (logo) {
    logo.addEventListener('click', function() {
      // Add a fun animation when logo is clicked
      this.style.animation = 'none';
      this.offsetHeight; // Trigger reflow
      this.style.animation = 'bounce 0.5s ease 3';
      
      setTimeout(() => {
        this.style.animation = '';
      }, 1500);
    });
  }

  console.log(' Main page loaded');
});
