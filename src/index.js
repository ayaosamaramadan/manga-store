let email = document.getElementById('email');
let password = document.getElementById('password');

document.getElementById('loginform').addEventListener('submit', function (event) {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (email.value === '' && password.value !== '') {
        event.preventDefault();
        notific('Email Is Required');
    } else if (password.value === '' && email.value !== '') {
        event.preventDefault();
        notific('Password Is Required');
    } else if (email.value === '' && password.value === '') {
        event.preventDefault();
        notific('Email & Password Is Required');
    
    }

 else if (!emailPattern.test(email.value)) {
    event.preventDefault();
    notific('Please enter a valid email address.');
} else if (password.value.length < 8) {
    event.preventDefault();
    notific('Password must be at least 8 characters long.');
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
    }, 2000);
};



// console.log(emailPattern.test(email.value));