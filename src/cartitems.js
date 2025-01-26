document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartitemsdiv = document.getElementById('cart-items');


        cartItems.forEach(cartItem => {
            const mangaincart = document.createElement('div');
            mangaincart.classList.add('cart-item');
            mangaincart.innerHTML = `
                <img class="mangaimg" src="${cartItem.images.jpg.image_url}" alt="${cartItem.title}">
                <h3 class='cartItem-title'>${cartItem.title}</h3>
                <p class="cartItem-synopsis">${limited(cartItem.synopsis, 10)}</p>
            `;
            cartitemsdiv.appendChild(mangaincart);
        });
    
});

const limited = (text, limitt) => {
    const words = text.split(' ');
    if (words.length > limitt) {
        return words.slice(0, limitt).join(' ') + '...';
    }
    return text;
};