document.addEventListener("DOMContentLoaded", function() {
    console.log("EGA Mentorship site loaded successfully!");
});

function applyMentorship() {
    alert("Thank you for your interest! Our team will contact you soon.");
}

// Navigation active link highlight
document.querySelectorAll("nav a").forEach(link => {
    if (link.href === window.location.href) {
        link.style.fontWeight = "bold";
        link.style.textDecoration = "underline";
    }
});

// Simulated login functionality
document.addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Login functionality coming soon!");
});


