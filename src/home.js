
let cartItems = [];

document.addEventListener('DOMContentLoaded', function() {
    const loggedInUserKey = localStorage.getItem('loggedInUser');
    if (!loggedInUserKey) {
    
        window.location.href = './index.html'; 
    } else {
      
        const user = JSON.parse(localStorage.getItem(loggedInUserKey));
        console.log('Welcome, ' + user.email);
    }

    fetched('https://api.jikan.moe/v4/manga', 1);
});

const fetched = (url, page) => {
    fetch(`${url}?page=${page}`)
        .then(response => response.json())
        .then(data => {
            console.log('Manga data:', data);
         
            displaydata(data.data);

           
            if (data.pagination && data.pagination.has_next_page) {
                fetched(url, page + 1);
            }
        })
        .catch(error => console.error('error on  fetch', error));
};

const displaydata = (listt) => {
    let cart = document.getElementById('cart'); 
    cart.addEventListener('click', function() {
        window.location.href = "../cartitems.html";
    });
    
    const mangadiv = document.getElementById('manga-container');
    mangadiv.classList.add('manga-container');
    listt.forEach(manga => {

        const themanga = document.createElement('div');
        themanga.setAttribute('class', 'manga');
        themanga.classList.add('mangastyle');
        themanga.innerHTML = `
          
           <img class="mangaimg" src="${manga.images.jpg.image_url}" alt="${manga.title}">
            <h3 class='manga-title'>${manga.title}</h3>
            <p class="manga-synopsis">${limited(manga.synopsis, 10)}</p>
            <p class="manga-price text-wheat">$${manga.score}</p>
            <button class="add-to-cart" id="${manga.mal_id}">Add To Cart</button>
       
            `;

        mangadiv.appendChild(themanga);

        let selectedManga = document.getElementById(`${manga.mal_id}`);


selectedManga.addEventListener('click', function() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const newcartitems = [...cartItems,  manga];

    localStorage.setItem('cartItems', JSON.stringify(newcartitems));
    console.log('Cart items:', newcartitems);

});

    });

    
};

const limited = (text, limitt) => {
    const words = text.split(' ');


    if (words.length > limitt) 
        {
         return  words.slice(0, limitt).join(' ') + '... READ MORE';
    }
    return text;
};


// cart.addEventListener('click', function() {
//     let cartitems = document.getElementById('cart-items');

// });





