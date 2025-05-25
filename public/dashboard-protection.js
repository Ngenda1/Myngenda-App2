/**
 * Dashboard Protection Script
 * 
 * Add this script to all dashboard pages to protect them from unauthorized access.
 * This script should be added after the standalone-auth.js script.
 */

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // If not authenticated, redirect to login
    if (!MyngendaAuth.isAuthenticated()) {
        console.log('User not authenticated, redirecting to login page');
        window.location.href = '/login.html';
        return;
    }

    // Get the current user data
    const user = MyngendaAuth.getUserData();
    console.log('User authenticated:', user.firstName, user.lastName);
    
    // Optional: Update UI with user information
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = `${user.firstName} ${user.lastName}`;
    }
    
    // Optional: Handle role-specific elements
    const adminElements = document.querySelectorAll('.admin-only');
    const driverElements = document.querySelectorAll('.driver-only');
    const userElements = document.querySelectorAll('.user-only');
    
    // Hide/show elements based on user role
    if (user.role === 'admin') {
        adminElements.forEach(el => el.style.display = 'block');
        driverElements.forEach(el => el.style.display = 'none');
        userElements.forEach(el => el.style.display = 'none');
    } else if (user.role === 'driver') {
        adminElements.forEach(el => el.style.display = 'none');
        driverElements.forEach(el => el.style.display = 'block');
        userElements.forEach(el => el.style.display = 'none');
    } else {
        adminElements.forEach(el => el.style.display = 'none');
        driverElements.forEach(el => el.style.display = 'none');
        userElements.forEach(el => el.style.display = 'block');
    }
});

// Handle logout button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.logout-button, .btn-logout, [data-action="logout"]')) {
        e.preventDefault();
        MyngendaAuth.logout();
    }
});