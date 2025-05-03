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
    // Show login container by default
    document.getElementById('container').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
    document.getElementById('mainNav').style.display = 'none';
});

// Main section opening function
function openSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }

    // Update navigation active states
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
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

// Login functionality
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Handle login form submission
document.querySelector('.sign-in-container form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    // Here you would typically validate credentials with a server
    // For demo purposes, we'll just check if fields are not empty
    if (email && password) {
        // Show main content and navigation
        document.getElementById('mainNav').style.display = 'block';
        document.getElementById('mainContent').style.display = 'block';
        
        // Hide login container
        document.getElementById('container').style.display = 'none';
        
        // Show home section
        openSection('home');
    } else {
        alert('Please fill in all fields');
    }
});

// Logout functionality
function logout() {
    // Hide main content and navigation
    document.getElementById('mainNav').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
    
    // Show login container
    document.getElementById('container').style.display = 'block';
    
    // Clear form fields
    document.querySelector('.sign-in-container form').reset();
}
