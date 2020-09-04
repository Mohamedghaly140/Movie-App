const leftMenu = $('.leftMenu');
const rightMenu = $('.rightMenu');
const triggle = $('#triggle');
const menuItems = $('.nav-item li');

triggle.click(function () {
  let leftMenuWidth = leftMenu.outerWidth();
  if (triggle.attr('class') == 'open') {
    triggle.removeClass('open').addClass('close');
    leftMenu.animate({ left: '0px' }, 1000);
    rightMenu.animate({ left: `${leftMenuWidth}` }, 1000);
    for (let i = 1; i <= menuItems.length; i++) {
      $(`.item${i}`).animate(
        { paddingTop: '25px', opacity: '1' },
        i * 100 + 1000
      );
    }
  } else {
    triggle.removeClass('close').addClass('open');
    leftMenu.animate({ left: `-${leftMenuWidth}` }, 1000);
    rightMenu.animate({ left: `0px` }, 1000);
    menuItems.animate({ paddingTop: '50px', opacity: '0' }, 1000);
  }
});

let allMovies = [];
let moviesContainer = $('#movies-container');
const imgPath = 'https://image.tmdb.org/t/p/w500/';

const getMovies = async (categoryItem = 'now_playing') => {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${categoryItem}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=1`
  );
  response = await response.json();
  // console.log(response);
  allMovies = response.results;
  // console.log(allMovies);
  displayMovies();
};

getMovies();

const displayMovies = () => {
  let temp = '';
  for (let i = 0; i < allMovies.length; i++) {
    temp += `
    <div class="col-md-4 mb-4">
      <div class="movie-item">
        <img class="img-fluid" src="${imgPath}${allMovies[i].poster_path}" alt="${allMovies[i].title}" />
        <div class="layer">
          <h3>${allMovies[i].title}</h3>
          <p>${allMovies[i].overview}</p>
          <p>Rate ${allMovies[i].vote_average}</p>
          <p>${allMovies[i].release_date}</p>
        </div>
      </div>
    </div>`;
  }
  moviesContainer.html(temp);
};

let menuLinks = document.querySelectorAll('.nav-item ul a');
for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener('click', function () {
    let category = this.getAttribute('movieTitle');
    // console.log(category);
    getMovies(category);
  });
}
