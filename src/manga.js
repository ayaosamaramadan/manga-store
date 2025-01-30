let back = document.getElementById('back-btn');
let numberitems = document.getElementById('number-itemsPack');
let mangacontainer = document.getElementById('themanga');
back.addEventListener('click', function () {
    window.location.href = '../home.html';
});

const manga = JSON.parse(localStorage.getItem('manga'));
console.log(manga); 

let storeddata = localStorage.getItem('loggedInUser');
let user = JSON.parse(localStorage.getItem(storeddata));
const itemNumber = user.cartItems.length;
numberitems.innerHTML = itemNumber;

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
    <div class="manga">
        <div class="manga-image">
            <img src="${manga.images.jpg.image_url}" alt="${manga.title}">
        </div>
        <div>
            <h3>${manga.title}</h3>
           
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

