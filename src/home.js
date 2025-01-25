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
    const mangadiv = document.getElementById('manga-container');
    listt.forEach(manga => {

        const themanga = document.createElement('div');
        themanga.classList.add('mangastyle');
        themanga.innerHTML = `
          
            <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
              <h3 class='text-red-600'>${manga.title}</h3><p>${manga.synopsis}</p>
             <button class="text-red-600 add-to-cart" mangaid="${manga.mal_id}">Add To Cart</button>
    
        `;

        mangadiv.appendChild(themanga);
    });
};