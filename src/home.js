
let cartItems = [];
let numberitems = document.getElementById('number-itemsPack');
let back = document.getElementById('back-btn');
let menu = document.getElementById('menu');
let menuDiv = document.getElementById('menuDiv');
let logout = document.getElementById('logoutLi');
document.addEventListener('DOMContentLoaded', function () {
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


const displaydata = (listt) => {
    let cart = document.getElementById('cart');
    cart.addEventListener('click', function () {
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

      
        selectedManga.addEventListener('click', function () {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
             newcartitems = [...cartItems, manga];

            localStorage.setItem('cartItems', JSON.stringify(newcartitems));
            console.log('Cart items:', newcartitems);

       itemNumber = cartItems.length + 1;
  numberitems.innerHTML = itemNumber;

  notific('Item added to cart');
        });

        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        itemNumber = cartItems.length;
        numberitems.innerHTML = itemNumber;
    });


};

const limited = (text, limitt) => {
    const words = text.split(' ');


    if (words.length > limitt) {
        return words.slice(0, limitt).join(' ') + '... READ MORE';
    }
    return text;
};

back.addEventListener('click', function() {
    history.back();
});

menu.addEventListener('click', function() {
    (menuDiv.style.display === 'block') ? menuDiv.style.cssText = 'display:none;' : menuDiv.style.display = 'block';
    if (menuDiv.style.display === 'block') {
        menuDiv.classList.add('animate-out');
    }
   });

logout.addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    window.location.href = './index.html';
}
);

