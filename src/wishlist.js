let storeddata = localStorage.getItem('loggedInUser');
let user = JSON.parse(localStorage.getItem(storeddata));
let back = document.getElementById('back-btn');
let numberitems = document.getElementById('number-itemsPack');
// let favmanga = document.getElementById('favmanga');
if (user && user.cartItems) {
    const itemNumber = user.cartItems.length;
    numberitems.innerHTML = itemNumber;
} else {
    numberitems.innerHTML = 0;
}


back.addEventListener('click', function () {
    window.location.href = '../home.html';
}
);

