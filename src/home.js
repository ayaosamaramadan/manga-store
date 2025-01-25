// document.addEventListener('DOMContentLoaded', function() {
//     const loggedInUserKey = localStorage.getItem('loggedInUser');
//     if (!loggedInUserKey) {
//         // If no user is logged in, redirect to login page
//         window.location.href = './index.html'; // Ensure the path is correct
//     } else {
//         // Retrieve and log user information
//         window.location.href = './home.html';
//         const user = JSON.parse(localStorage.getItem(loggedInUserKey));
//         console.log('Email:', user.email);
//         console.log('Password:', user.password);
//     }
// });