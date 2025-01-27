let email = document.getElementById('email');
let password = document.getElementById('password');
let submitBtn = document.getElementById('submit-btn');
let signup = document.getElementById('signup');
let namee = document.getElementById('name');
let ismember = document.getElementById('not-memb');

document.getElementById('loginform').addEventListener('submit', function (event) {
    event.preventDefault();

    if (submitBtn.innerHTML === 'Sign Up') {
        let userKey = `user_${email.value}`;
        let storedUser = JSON.parse(localStorage.getItem(userKey));
        if (storedUser && storedUser.email === email.value) {
            notific('Email already exists');
        } else {

            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            let upperCase = /[A-Z]/;


            if (email.value === '' && password.value !== '') {
                event.preventDefault();
                notific('Email is required');
            }
            else if (password.value === '' && email.value !== '') {
                event.preventDefault();
                notific('Password is required');
            }
            else if (email.value === '' && password.value === '') {
                event.preventDefault();
                notific('Email and Password are required');
            }
            else if (!emailPattern.test(email.value)) {
                event.preventDefault();
                notific("Please enter a valid email address. Example: user@example.com");
            }
            else if (!upperCase.test(password.value)) {
                event.preventDefault();
                notific('Password must contain at least one upper letter');
            }
            else if (password.value.length < 8) {
                event.preventDefault();
                notific('Password must be at least 8 characters');
            }
            else {
                let user = {
                    email: email.value,
                    password: password.value
                };
                localStorage.setItem(userKey, JSON.stringify(user));
                localStorage.setItem('loggedInUser', userKey);
                window.location.href = '../home.html';
            }





            // let user = {
            //     email: email.value,
            //     password: password.value
            // };
            // localStorage.setItem(userKey, JSON.stringify(user));
            // localStorage.setItem('loggedInUser', userKey);
            // window.location.href = '../home.html';
        } 
    }
    else if (submitBtn.innerHTML === 'Login') { let userKey = `user_${email.value}`;
        let storedUser = JSON.parse(localStorage.getItem(userKey));
        if (storedUser) {
            if (storedUser.password === password.value ) {
                event.preventDefault();
                localStorage.setItem('loggedInUser', userKey);
                window.location.href = '../home.html';
            }
            else  {
                notific('Invalid password');
            }
        }
        else {
            notific('User not found');
        }
    }}
       

);


signup.addEventListener('click', function (
    ) {
    namee.innerHTML = 'Sign Up';
    submitBtn.innerHTML = 'Sign Up';
    ismember.style.display = 'none';

});

const notific = (massage) => {
    let notif = document.createElement("div");
    notif.setAttribute("class", "notif show");
    let p = document.createElement("p");
    p.setAttribute("class", "notif-p");
    p.innerHTML = `<i class="fa-solid fa-x err"></i>  ${massage}`;
    notif.appendChild(p);
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.classList.remove("show");
        notif.classList.add("hide");
        setTimeout(() => {
            notif.remove();
        }, 300);
    }, 6000);
};

