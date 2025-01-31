let storeddata = localStorage.getItem('loggedInUser');
let user = JSON.parse(localStorage.getItem(storeddata));
let back = document.getElementById('back-btn');
let numberitems = document.getElementById('number-itemsPack');
let favmanga = document.getElementById('fav-manga');
let cartDiv= document.getElementById('cartDiv');

const notific = (massage) => {
    let notif = document.createElement("div");
    notif.setAttribute("class", "wish-notific notif show");
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


if (favmanga && user && user.wishlist) {
    user.wishlist.forEach((manga, index) => {
        let favmangaDiv = document.createElement('div');
favmangaDiv.setAttribute('class', 'cart-style');
        favmangaDiv.setAttribute('id', `wishlist-item-${index}`);
        favmangaDiv.innerHTML = `
        <div>
               <img src="${manga.images.jpg.image_url}" alt="${manga.title} class="mangaimg">
            </div>
            <div class="fav-manga-info">
                <div class="fav-manga-title">
                    <h3>${manga.title}</h3>
                    </div>
                <p class="fav-mang-sco">$ ${manga.score}</p>
            </div>
            <div class="fav-manga-btn">
           <i class="fa-solid fa-heart" id="heartInWishlist"></i>
                <button class="add-cart-wishlis" id="add-to-cart-${manga.mal_id}">Add To Cart</button>
              
           </div>
        </div>


           
              
        `;  // <img class="cartItem-img" src="${cartItem.images.jpg.image_url}" alt="${cartItem.title}">
                // <div class="cartItem-info">
                //     <h3 class='cartItem-title'>${cartItem.title}</h3>
                //     <p class="cartItem-price text-wheat">$${score}</p>
                // </div>
        favmanga.appendChild(favmangaDiv);

        const removeButton = favmangaDiv.querySelector('.fa-heart');
        removeButton.addEventListener('click', () => {
            const index = user.wishlist.indexOf(manga);
            remove(index);
        });

        let selectedManga = document.getElementById(`add-to-cart-${manga.mal_id}`);
        selectedManga.addEventListener('click', function () {

            const loggedInUserKey = localStorage.getItem('loggedInUser');
            if (loggedInUserKey) {
                const user = JSON.parse(localStorage.getItem(loggedInUserKey));
                if (!user.cartItems) {
                    user.cartItems = [];
                }
                user.cartItems.push(manga);
                localStorage.setItem(loggedInUserKey, JSON.stringify(user));
                notific("Item added to cart");
                const itemNumber = user.cartItems.length;
                numberitems.innerHTML = itemNumber;
        
            }
        });
        if (user && user.cartItems) {
            const itemNumber = user.cartItems.length;
            numberitems.innerHTML = itemNumber;
        } else {
            numberitems.innerHTML = 0;
        }
        
    });
}

const remove = (index) => {
    const loggedInUserKey = localStorage.getItem('loggedInUser');
    if (loggedInUserKey) {
        const user = JSON.parse(localStorage.getItem(loggedInUserKey));

        const newwishlist = user.wishlist.filter((_, i) => i !== index);
        localStorage.setItem(loggedInUserKey, JSON.stringify({ ...user, wishlist: newwishlist }));
        document.getElementById(`wishlist-item-${index}`).remove();
        notific('Item removed from cart');
        updateremove();
    }
}

const updateremove = () => {
    const cartItems = document.querySelectorAll('.cartstyle');
    cartItems.forEach((item, index) => {
        item.setAttribute('id', `cart-item-${index}`);
        const removeButton = item.querySelector('.remove-cart');
        removeButton.onclick = () => removecart(index);
    });
};

cartDiv.addEventListener('click', function () {
    window.location.href ='../cartitems.html';
});

back.addEventListener('click', function () {
    window.location.href = '../home.html';
}
);