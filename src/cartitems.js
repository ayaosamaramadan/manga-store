let totalpriceDiv = document.getElementById('total-p');
let removeCart = document.getElementById('remove-cart');
let totalPrice = 0;
let back = document.getElementById('back-btn');
let noItem = document.getElementById('no-item');

let currItem = 0;

const notific = (message) => {
    let notif = document.createElement("div");
    notif.setAttribute("class", "notif show");
    let p = document.createElement("p");
    p.setAttribute("class", "notif-p");
    p.innerHTML = `<i class="fa-solid fa-check success"></i>  ${message}`;
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

document.addEventListener('DOMContentLoaded', function () {
    const loggedInUserKey = localStorage.getItem('loggedInUser');
    if (loggedInUserKey) {
        const user = JSON.parse(localStorage.getItem(loggedInUserKey));
        const cartitemsdiv = document.getElementById('cart-items');

        user.cartItems.forEach((cartItem, index) => {
            const score = cartItem.score !== null ? cartItem.score : 8.04;
            const mangaincart = document.createElement('div');
            mangaincart.classList.add('cartstyle');
            mangaincart.setAttribute('id', `cart-item-${index}`);
            mangaincart.innerHTML = `
                <div>
                    <i class="fa-solid fa-x remove-cart"></i>
                </div>  
                <img class="cartItem-img" src="${cartItem.images.jpg.image_url}" alt="${cartItem.title}">
                <div class="cartItem-info">
                    <h3 class='cartItem-title'>${cartItem.title}</h3>
                    <p class="cartItem-price text-wheat">$${score}</p>
                </div>
            `;
            cartitemsdiv.appendChild(mangaincart);

            const removeButton = mangaincart.querySelector('.remove-cart');
            removeButton.addEventListener('click', () => { removecart(index) });

            totalPrice += score;
            currItem++;
        });

        const totalPriceElement = document.getElementById('total-p');
        totalPriceElement.innerHTML = `TOTAL PRICE: $${totalPrice.toFixed(2)}`;

        if (currItem === 0) {
            document.getElementById('no-item').innerHTML = 'NO ITEM IN CART';
        }
    }
});

const removecart = (index) => {
    const loggedInUserKey = localStorage.getItem('loggedInUser');
    if (loggedInUserKey) {
        const user = JSON.parse(localStorage.getItem(loggedInUserKey));
        const cartItem = user.cartItems[index];
        const newcartitems = user.cartItems.filter((item, i) => i !== index);
        localStorage.setItem(loggedInUserKey, JSON.stringify({ ...user, cartItems: newcartitems }));
        document.getElementById(`cart-item-${index}`).remove();

        const score = cartItem.score !== null ? cartItem.score : 8.04;
        totalPrice -= score;
        totalPrice = Math.max(0, totalPrice); 

        const totalPriceElement = document.getElementById('total-p');
        totalPriceElement.innerHTML = `TOTAL PRICE: $${totalPrice.toFixed(2)}`;

        currItem--;
        if (currItem === 0) {
            totalPriceElement.innerHTML = `TOTAL PRICE: $${totalPrice.toFixed(2)}`;
            noitem.innerHTML = 'NO ITEM IN CART';
        }

        notific('Item removed from cart');

                updateremove();
    }
};

const updateremove = () => {
    const cartItems = document.querySelectorAll('.cartstyle');
    cartItems.forEach((item, index) => {
        item.setAttribute('id', `cart-item-${index}`);
        const removeButton = item.querySelector('.remove-cart');
        removeButton.onclick = () => removecart(index);
    });
};

back.addEventListener('click', function () {
    window.location.href = '../home.html';
});

if (currItem === 0) {
    document.getElementById('no-item').innerHTML = 'NO ITEM IN CART';
}

