// Cache DOM elements
const domElements = {
    sections: document.querySelectorAll('.content-section'),
    navLinks: document.querySelectorAll('nav ul li a'),
    colorChangeText: document.querySelector('.color-change')
};

// Configuration
const CONFIG = {
    colors: ['#00ff7f', '#ff7f50', 'yellow', '#f4a460', 'orange', 'red', '#ffd700', '#7fffd4'],
    animationDelay: 100,
    colorChangeInterval: 4000
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    openSection('home');
});

// Main section opening function
function openSection(sectionId) {
    // Hide all sections and remove active class
    domElements.sections.forEach((section) => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        selectedSection.classList.add('active');

        // Handle animations for specific sections
        const sectionAnimations = {
            'courses': '.semesters',
            'notes': '.notes',
            'questionPapers': '.questions'
        };

        if (sectionAnimations[sectionId]) {
            animateSection(selectedSection, sectionAnimations[sectionId]);
        }
    }

    // Update navigation active states
    domElements.navLinks.forEach((link) => {
        link.classList.remove('active');
    });

    const activeNavLink = document.getElementById(sectionId + 'Tab');
    if (activeNavLink) {
        activeNavLink.classList.add('active');
    }
}

// Animation helper function
function animateSection(section, selector) {
    const contentList = section.querySelector(selector);
    if (!contentList) return;

    // Remove show class
    contentList.classList.remove('show');

    // Force reflow
    void contentList.offsetWidth;

    // Add show class after brief delay
    requestAnimationFrame(() => {
        contentList.classList.add('show');
    });
}

// Color change animation
let colorIndex = 0;

function changeColor() {
    if (domElements.colorChangeText) {
        domElements.colorChangeText.style.color = CONFIG.colors[colorIndex];
        colorIndex = (colorIndex + 1) % CONFIG.colors.length;
    }
}

setInterval(changeColor, CONFIG.colorChangeInterval);
// Smooth Scroll JavaScript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
