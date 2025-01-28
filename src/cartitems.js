let totalpriceDiv = document.getElementById('total-p');
let removeCart = document.getElementById('remove-cart');
let totalPrice = 0;
let back = document.getElementById('back-btn');

let currItem = 0;

const notific = (massage) => {
    let notif = document.createElement("div");
    notif.setAttribute("class", "notif show");
    let p = document.createElement("p");
    p.setAttribute("class", "notif-p");
    p.innerHTML = `<i class="fa-solid fa-check success"></i>  ${massage}`;
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


document.addEventListener('DOMContentLoaded', function() {
    const loggedInUserKey = localStorage.getItem('loggedInUser');
    const user = JSON.parse(localStorage.getItem(loggedInUserKey));
    if (loggedInUserKey) {
        const cartitemsdiv = document.getElementById('cart-items');
        user.cartItems.forEach((cartItem, index)=> {
            const mangaincart = document.createElement('div');
            mangaincart.classList.add('cartstyle');
            mangaincart.setAttribute('id', `cart-item-${index}`);
            mangaincart.innerHTML = `
                <img class="cartItem-img" src="${cartItem.images.jpg.image_url}" alt="${cartItem.title}">
                <div class="cartItem-info">
                 <i class="fa-solid fa-x remove-cart"></i>
                 <h3 class='cartItem-title'>${cartItem.title}</h3>
                 <p class="cartItem-price text-wheat">$${cartItem.score}</p>
            </div>
                `;
            const removeButton = mangaincart.querySelector('.remove-cart');
            removeButton.addEventListener('click', () => {removecart(cartItem, index)});
            totalPrice += cartItem.score;
            totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice.toFixed(2)}`;
            cartitemsdiv.appendChild(mangaincart);
            currItem++; 
        });
    }

});

(totalPrice===0)?totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`:totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`;

const removecart = (cartItem, index) => {  
    const loggedInUserKey = localStorage.getItem('loggedInUser');
    const user = JSON.parse(localStorage.getItem(loggedInUserKey));

    const newcartitems = user.cartItems.filter((item, i) => i !== index);
    localStorage.setItem(loggedInUserKey, JSON.stringify({...user, cartItems: newcartitems}));
    document.getElementById(`cart-item-${index}`).remove();
    totalPrice -= cartItem.score;
    totalPrice = Math.max(0, totalPrice);
    
    totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice.toFixed(2)}`;
    currItem--;
    if(currItem === 0){
        totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`;
    }
    notific('Item removed from cart');
}

back.addEventListener('click', function() {
    history.back();
});