let totalpriceDiv = document.getElementById('total-p');
let totalPrice = 0;
document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartitemsdiv = document.getElementById('cart-items');


        cartItems.forEach(cartItem => {
            const mangaincart = document.createElement('div');
            mangaincart.classList.add('cartstyle');
            // mangaincart.style.cssText = "margin: 4%; padding: 10px;";
            mangaincart.innerHTML = `
                <img class="cartItem-img" src="${cartItem.images.jpg.image_url}" alt="${cartItem.title}">
                <div class="cartItem-info">
                <h3 class='cartItem-title'>${cartItem.title}</h3>
                <br>   

                <p class="cartItem-price text-wheat">$${cartItem.score}</p>
            </div>
                `;
            totalPrice += cartItem.score;
            totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice.toFixed(2)}`;
            cartitemsdiv.appendChild(mangaincart);
        });
    
});

(totalPrice===0)?totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`:totalpriceDiv.innerHTML = `TOTAL PRICE : $ ${totalPrice}`;