let totalpriceDiv = document.getElementById('total-p');
let removeCart = document.getElementById('remove-cart');
let totalPrice = 0;

let currItem = 0;

document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartitemsdiv = document.getElementById('cart-items');
        cartItems.forEach((cartItem, index)=> {
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
            removeButton.addEventListener('click', () => removecart(cartItem, index));
            totalPrice += cartItem.score;
            totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice.toFixed(4)}`;
            cartitemsdiv.appendChild(mangaincart);
            currItem++;

            
        });
    
});

(totalPrice===0)?totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`:totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`;


const removecart = (cartItem, index) => {  
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newcartitems = cartItems.filter((item, i) => i !== index);
    localStorage.setItem('cartItems', JSON.stringify(newcartitems));
    document.getElementById(`cart-item-${index}`).remove();
    totalPrice -= cartItem.score;
    totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice.toFixed(4)}`;
    currItem--;
    if(currItem === 0){
        totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`;
    }
    location.reload();
}