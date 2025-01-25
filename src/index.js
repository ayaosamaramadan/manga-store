document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let email = document.getElementById('email');
    let password = document.getElementById('password');
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let upperCase = /[A-Z]/;

    if (email.value === '' && password.value !== '') {
        notific('Email Is Required');
    } else if (password.value === '' && email.value !== '') {
        notific('Password Is Required');
    } else if (email.value === '' && password.value === '') {
        notific('Email & Password Is Required');
    } else if (!emailPattern.test(email.value)) {
        notific('Please enter a valid email address.<br>Example: user@example.com');
    } else if (password.value.length < 8) {
        notific('Password must be at least 8 characters long.');
    if (!upperCase.test(password.value)) {
        notific('Password must contain at least one UpperCase letter.');
    } else {
        let userKey = `user_${email.value}`;
        let storedUser = JSON.parse(localStorage.getItem(userKey));

        if (storedUser) {
            if (storedUser.password === password.value) {
                localStorage.setItem('loggedInUser', userKey);
                window.location.href = './home.html';
            } else {
                notific('Incorrect password.');
            }
        } else {
            localStorage.setItem(userKey, JSON.stringify({ email: email.value, password: password.value }));
            localStorage.setItem('loggedInUser', userKey);
            window.location.href = './home.html';
        }
    }
    
    
        
});

const notific = (message) => {
    let notif = document.createElement("div");
    notif.setAttribute("class", "notif show");
    let p = document.createElement("p");
    p.setAttribute("class", "notif-p");
    p.innerHTML = `<i class="fa-solid fa-x err"></i> ${message}`;
    notif.appendChild(p);
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.classList.remove("show");
        notif.classList.add("hide");
        setTimeout(() => {
            notif.remove();
        }, 1000);
    }, 3000);
};