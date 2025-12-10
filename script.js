// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Logo scaling on scroll and chevron visibility
window.addEventListener('scroll', () => {
    const logoImage = document.querySelector('.logo-image');
    const logoSection = document.querySelector('.logo-section');
    const chevronDown = document.querySelector('.chevron-down');
    const subtitle = document.querySelector('.logo-subtitle');
    
    const scrolled = window.pageYOffset;
    
    // Show/hide chevron based on scroll position
    if (chevronDown) {
        if (scrolled <  100 ) {
            chevronDown.classList.add('visible');
            subtitle.classList.add('visible');
        } else {
            chevronDown.classList.remove('visible');
            subtitle.classList.remove('visible');
        }
    }
    
    if (logoImage && logoSection) {
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress based on viewport height
        // Logo starts shrinking after scrolling past one viewport height
        const scaleDownDistance = windowHeight * 0.8;
        const scrollProgress = Math.max(0, Math.min(1, scrolled / scaleDownDistance));
        
        // Scale from 1 (big) to 0.3 (small)
        const minScale = 0;
        const maxScale = 1;
        const scale = maxScale - (scrollProgress * (maxScale - minScale));
        if (scale > 0){ 
            logoImage.style.display = 'block';  
            logoImage.style.transform = `scale(${scale}) translateY(0)`;
        } else {
            logoImage.style.display = 'none';
        }
    }
}, { passive: true });

// Initial logo setup
function setupLogo() {
    const logoImage = document.querySelector('.logo-image');
    const logoContainer = document.querySelector('.logo-container');
    
    if (logoImage) {
        logoImage.style.transform = 'scale(1) translateY(0)';
    }
    if (logoContainer) {
        logoContainer.style.height = '400px';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setupLogo();
    
    // Show chevron initially if at top
    const chevronDown = document.querySelector('.chevron-down');
    if (chevronDown && window.pageYOffset === 0) {
        chevronDown.classList.add('visible');
    }
    
    // Trigger initial scroll calculation
    window.dispatchEvent(new Event('scroll'));
});

