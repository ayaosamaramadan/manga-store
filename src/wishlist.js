let storeddata = localStorage.getItem('loggedInUser');
let user = JSON.parse(localStorage.getItem(storeddata));
let back = document.getElementById('back-btn');
let numberitems = document.getElementById('number-itemsPack');
let favmanga = document.getElementById('fav-manga');

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

if (favmanga && user && user.wishlist) {
    user.wishlist.forEach((manga , index) => {
        let favmangaDiv = document.createElement('div');

        favmangaDiv.setAttribute('id', `wishlist-item-${index}`);
        favmangaDiv.innerHTML = `
        <div>
            <div>
                <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
            </div>
            <div>
                <div>
                    <h3>${manga.title}</h3>
                    <i class="fa-solid fa-heart" id="heartInWishlist"></i>
                </div>
                <p>${manga.score}</p>
            </div>
            <button class="add-cart-wishlis" id="add-to-cart-${manga.mal_id}">Add To Cart</button>
        </div>
        `;
        favmanga.appendChild(favmangaDiv);

        const removeButton = favmangaDiv.querySelector('.fa-heart');
        removeButton.addEventListener('click', () => { 
            const index = user.wishlist.indexOf(manga);
            remove(index);
        });

    

  let selectedManga = document.getElementById(`add-to-cart-${manga.mal_id}`);
  selectedManga.addEventListener('click', function () {
  
 const loggedInUserKey= localStorage.getItem('loggedInUser');
 if (loggedInUserKey) {
     const user = JSON.parse(localStorage.getItem(loggedInUserKey));
     if (!user.wishlist) {
         user.wishlist = [];
     }
     user.wishlist.push(manga);
     localStorage.setItem(loggedInUserKey, JSON.stringify(user));
     notific("Item added to cart");
  
 }

});
const loggedInUserKey = localStorage.getItem('loggedInUser');
if (loggedInUserKey) {
 const user = JSON.parse(localStorage.getItem(loggedInUserKey));
 if (!user.wishlist) {
     user.wishlist = [];
 }

}

}


);






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