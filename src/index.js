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
            let user = {
                email: email.value,
                password: password.value
            };
            localStorage.setItem(userKey, JSON.stringify(user));
            localStorage.setItem('loggedInUser', userKey);
            window.location.href = '../home.html';
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

