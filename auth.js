// auth.js

// Function to check if the user is logged in
function isLoggedIn() {
    return !!localStorage.getItem("token");
  }
  
  // Function to handle login protection on each page
  function requireLogin(event) {
    if (!isLoggedIn()) {
      event.preventDefault(); // Prevent navigation
      alert("Please log in to access this page.");
      window.location.href = "login.html"; // Redirect to login page
    }
  }
  
  // This function can be used to protect the page content
  function protectPage() {
    if (!isLoggedIn()) {
      window.location.href = "login.html"; // Redirect to login if not logged in
    }
  }
  