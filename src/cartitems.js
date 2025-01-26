let totalpriceDiv = document.getElementById('total-p');
let removeCart = document.getElementById('remove-cart');
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartitemsdiv = document.getElementById('cart-items');
        cartItems.forEach(cartItem => {
            const mangaincart = document.createElement('div');
            mangaincart.classList.add('cartstyle');
            mangaincart.innerHTML = `
                <img class="cartItem-img" src="${cartItem.images.jpg.image_url}" alt="${cartItem.title}">
                <div class="cartItem-info">
                 <i class="fa-solid fa-x remove-cart"></i>
                 <h3 class='cartItem-title'>${cartItem.title}</h3>
                 <p class="cartItem-price text-wheat">$${cartItem.score}</p>
            </div>
                `;
            const removeButton = mangaincart.querySelector('.remove-cart');
            removeButton.addEventListener('click', () => removecart(cartItem));
            totalPrice += cartItem.score;
            totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice.toFixed(2)}`;
            cartitemsdiv.appendChild(mangaincart);

            
        });
    
});

(totalPrice===0)?totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`:totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`;


const removecart = (cartItem) => {  
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newcartitems = cartItems.filter(item => item.mal_id !== cartItem.mal_id);
    localStorage.setItem('cartItems', JSON.stringify(newcartitems));
    location.reload();
}