let next= document.getElementById('next-btn');
let pre = document.getElementById('pre-btn');
let curr = 1;
let numberitems = document.getElementById('number-itemsPack');
let back = document.getElementById('back-btn');
let menu = document.getElementById('menu');
let menuDiv = document.getElementById('menuDiv');
let wishlist = document.getElementById('wishlist');
let logout = document.getElementById('logoutLi');


let welcomeMassage = localStorage.getItem('welcomeMassage');
    let welcome = document.getElementById('welcomMass');
    
    if (welcomeMassage) {
        welcome.innerHTML = `${welcomeMassage} <i class="fa-solid fa-face-laugh-wink"></i> `;
        welcome.classList.add('welcomee');
       
    }

document.addEventListener('DOMContentLoaded', function () {
    // let welcome = document.getElementById('welcomMass');
// welcome.innerHTML = "Welcome to manga store";
// localStorage.setItem('welcomeMassage', welcome.innerHTML);

     // console.log(localStorage.getItem('welcomeMassage '));

const loggedInUserKey = localStorage.getItem('loggedInUser');
    if (!loggedInUserKey) {

        window.location.href = '../index.html';
    } else {

        const user = JSON.parse(localStorage.getItem(loggedInUserKey));
        // console.log('Logged in user:', user);
    }

    setInterval(() => {
        localStorage.removeItem('welcomeMassage');
        welcome.innerHTML = '';
        welcome.classList.remove('welcomee');
    }, 5000);
    fetched('https://api.jikan.moe/v4/manga', 1);

});

const fetched = (url ,page,query = '') => {
    showLoading();
       const apiUrl= query? `${url}?page=${page}&q=${query}&sfw=true`: `${url}?page=${page}&sfw=true`;

    fetch( apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Manga data:', data);
            if (data.data) {
                displaydata(data.data);
                localStorage.setItem('mangaData', JSON.stringify(data.data));
          
            } else {
                console.error('No data found in response');
            }
            hideLoading();
        })
        .catch(error => {
            console.error('Error fetching manga data:', error);
            hideLoading();
        });
};

const showLoading = () => {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'block';
    }
};

const hideLoading = () => {
    const loadingDiv = document.getElementById('loading');
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
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
    
let cartDiv = document.getElementById('cartDiv');
cartDiv.addEventListener('click', function () {
        window.location.href = "../cartitems.html";
    });

    const mangadiv = document.getElementById('manga-container');
    mangadiv.innerHTML = '';
    mangadiv.classList.add('manga-container');
    listt.forEach(manga => {
        const score = manga.score !== null ? manga.score : 8.04;
   
        const themanga = document.createElement('div');
        themanga.setAttribute('class', 'manga');
        themanga.classList.add('mangastyle');
        themanga.setAttribute('id', `${manga.mal_id}`);
       
        themanga.innerHTML = `
        
           <img class="mangaimg" src="${manga.images.jpg.image_url}" alt="${manga.title} id="${manga.images}">
            <h3 class='manga-title'>${manga.title}</h3> 
            
            <p class="manga-synopsis">${limited(manga.synopsis, 10)}</p>
            <p class="manga-price text-wheat">$ ${score}</p>
           
            <button class="add-to-cart" id="add-to-cart-${manga.mal_id}">Add To Cart</button>
            `;

        mangadiv.appendChild(themanga);
        const goTomangoo = document.getElementById(`${manga.mal_id}`);
        // console.log(goTomangoo);


        if (goTomangoo) {
            goTomangoo.addEventListener('click', function () {
                localStorage.setItem('manga', JSON.stringify(manga));
                window.location.href = '../manga.html';
            });
        }
        

        let selectedManga = document.getElementById(`add-to-cart-${manga.mal_id}`);


        selectedManga.addEventListener('click', function (event) {
               event.stopPropagation() ;
            const loggedInUserKey= localStorage.getItem('loggedInUser');
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
        const loggedInUserKey = localStorage.getItem('loggedInUser');
        if (loggedInUserKey) {
            const user = JSON.parse(localStorage.getItem(loggedInUserKey));
            if (!user.cartItems) {
                user.cartItems = [];
            }
            const itemNumber = user.cartItems.length;
            numberitems.innerHTML = itemNumber;
        }
    });


};

// const goTomango = (goTomangoo, manga) => {
  
// };
const limited = (text, limitt) => {
    if (!text) return '';
    const words = text.split(' ');


    if (words.length > limitt) {
        return words.slice(0, limitt).join(' ') + '... READ MORE';
    }
    return text;
};


menu.addEventListener('click', function () {
    (menuDiv.style.display === 'block') ? menuDiv.style.cssText = 'display:none;' : menuDiv.style.display = 'block';
    if (menuDiv.style.display === 'block') {
        menuDiv.classList.add('animate-out');
    }
});

let islogout = document.getElementById('divlogout');
let yes = document.getElementById('yes');
let no = document.getElementById('no');

logout.addEventListener('click', function () {
    islogout.style.display = 'block';
    // localStorage.removeItem('loggedInUser');
    // window.location.href = './index.html';
}
);

yes.addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = '../index.html';
    

}
);

no.addEventListener('click', function () {
    islogout.style.display = 'none';
    menuDiv.style.display = 'none';
}
);


const searchData = (query) => {
    fetched('https://api.jikan.moe/v4/manga', 1, query);
    const data = JSON.parse(localStorage.getItem('mangaData'));
    const filteredData = data.filter(manga => {
        return manga.title.toLowerCase().includes(query.toLowerCase());
    });
    displaydata(filteredData);

};



 next.addEventListener('click', (event) => {
    event.preventDefault();
    curr++;
    fetched("https://api.jikan.moe/v4/manga", curr);
}

);

pre.addEventListener('click', (event) => {
    event.preventDefault();
    if (curr > 1) {
        curr--;
        fetched("https://api.jikan.moe/v4/manga", curr);
    }
   
}
); 


wishlist.addEventListener('click', function () {
    window.location.href = '../wishlist.html';
});