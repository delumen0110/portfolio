// script.js

// Form Validation
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('All fields must be filled out.');
        return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animations
const animatedElements = document.querySelectorAll('.animate');

const animateOnScroll = () => {
    animatedElements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (position < screenPosition) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Message Storage
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push({ name, email, message });
        localStorage.setItem('messages', JSON.stringify(messages));
        alert('Message stored!');
        form.reset();
    }
});