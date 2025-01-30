let back = document.getElementById('back-btn');
let numberitems = document.getElementById('number-itemsPack');
let mangacontainer = document.getElementById('themanga');
let cartDiv= document.getElementById('cartDiv');

let wishlist = document.getElementById('wishlist');
back.addEventListener('click', function () {
    window.location.href = '../home.html';
});

const manga = JSON.parse(localStorage.getItem('manga'));
console.log(manga); 

let storeddata = localStorage.getItem('loggedInUser');
let user = JSON.parse(localStorage.getItem(storeddata));
if (user && user.cartItems) {
    const itemNumber = user.cartItems.length;
    numberitems.innerHTML = itemNumber;
} else {
    numberitems.innerHTML = 0;
}

// const limited = (text) => {
//     if (!text) return '';
//     const words = text.split(' ');

//     if (words.length > 10) {
//         return words.slice(0, 10).join(' ') + '... READ MORE';
//     }
//     return text;
// };

let themanga = document.createElement('div');
themanga.innerHTML = `
    <div class="manga-details">
        <div class="manga-image">
            <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
        </div>
        <div class="themanga-info">
        <div class="manga-top">
            <h3>${manga.title}</h3>
           <i class="fa-regular fa-heart" id="heart1" onclick></i>
       </div>
            <p>${manga.score}</p>
          <p>authors ${manga.authors && manga.authors.length > 0 ? manga.authors[0].name : 'Unknown'}</p>
           <p>Chapters: ${manga.chapters ? manga.chapters : 'Unknown'}</p>
        <p>Volumes: ${manga.volumes ? manga.volumes : 'Unknown'}</p>
        <p>Published: ${manga.published ? manga.published.string : 'Unknown'}</p>
        <p>Genres: ${manga.genres.map(genre => genre.name).join(', ')}</p>
        <p>Members: ${manga.members}</p>
        <p>Popularity: ${manga.popularity}</p>
        
        <p>Ranked: ${manga.rank}</p>
 <p>${manga.synopsis}</p>

        </div>
    </div>
`;
mangacontainer.appendChild(themanga);
let heart= document.getElementById('heart1');





if (heart) {
heart.addEventListener('click', function () {
    let storeddata = localStorage.getItem('loggedInUser');
     let user=JSON.parse(  localStorage.getItem(storeddata));
    if (!user.wishlist){


           user.wishlist =[];
    }
    if ( heart.classList.contains('fa-regular')) 
        {
          heart.classList.remove('fa-regular');
        heart.classList.add('fa-solid');notific('Added to wishlist');

        if (!user.wishlist.some(mang => mang.mal_id === manga.mal_id)) 
            {user.wishlist.push(manga);
            localStorage.setItem(storeddata, JSON.stringify(user));
        }


    
            
    }
    
    
    else if(heart.classList.contains('fa-solid')) {
        heart.classList.remove('fa-solid');
        heart.classList.add('fa-regular');
        notific('Removed from wishlist');

          user.wishlist =user.wishlist.filter(mang => mang.mal_id !== manga.mal_id);
        localStorage.setItem(storeddata, JSON.stringify(user));
    }
});
}


if (user.wishlist && user.wishlist.some(mang => mang.mal_id === manga.mal_id)) {
    heart.classList.remove('fa-regular');
    heart.classList.add('fa-solid');
}

 cartDiv.addEventListener('click', function () {
     window.location.href ='../cartitems.html';
});

wishlist.addEventListener('click', function () {
    window.location.href = '../wishlist.html';
});

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
    }, 2000);
};


