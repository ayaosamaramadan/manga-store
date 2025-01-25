let email = document.getElementById('email');
let password = document.getElementById('password');
document.getElementById('loginform').addEventListener('submit', function (event) {
   
    event.preventDefault();
    
        let userKey = `user_${email.value}`;
        let storedUser = JSON.parse(localStorage.getItem(userKey));

        if (storedUser) {
            if (storedUser.password === password.value) {
                localStorage.setItem('loggedInUser', userKey);
                event.preventDefault();
                window.location.href = './home.html';
            } else {
                notific('Incorrect password.');
            }
        } else if (email.value === '' && password.value !== '') {
            event.preventDefault();
            notific('Email Is Required');
        }
        else if (password.value === '' && email.value !== '') {
            event.preventDefault();
            notific('Password Is Required');
        }
        else if (email.value === '' && password.value === '') {
            event.preventDefault();
            notific('Email & Password Is Required');
        }
        else {
            event.preventDefault();
            notific('Email not found.');
        }
    
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


let signup = document.getElementById('signup');
let namee = document.getElementById('name');
let btn = document.getElementById('submit-btn');
let ismember = document.getElementById('not-memb');


signup.addEventListener('click', function (
    event) {
    namee.innerHTML = 'Sign Up';
    btn.innerHTML = 'Sign Up';
    ismember.style.display = 'none';

    event.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let upperCase = /[A-Z]/;

    if (email.value === '' && password.value !== '') {
        event.preventDefault();
        notific('Email Is Required');
    }
    else if (password.value === '' && email.value !== '') {
        event.preventDefault();
        notific('Password Is Required');
    }
    else if (email.value === '' && password.value === '') {
        event.preventDefault();
        notific('Email & Password Is Required');
    }
    else if (!emailPattern.test(email.value)) {
        event.preventDefault();
        notific('Invalid Email');
    }
    else if (!upperCase.test(password.value)) {
        event.preventDefault();
        notific('Password must contain at least one uppercase letter');
    }
    else {
        let userKey = `user_${email.value}`;
        let user = {
            email: email.value,
            password: password.value
        };
        localStorage.setItem(userKey, JSON.stringify(user));
        notific('User created successfully');
    }

});