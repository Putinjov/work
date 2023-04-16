import axios from 'axios';
import * as basicLightbox from 'basiclightbox';


const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=f7d7a9b2e374f67b5381a74b61fb7dc2';
const id = 1841;
const modal = document.querySelector('.modal')

export default async function fetchTrailer(id) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos${API_KEY}&language=en-US`);
    const trailer = response.data.results.find(video => video.type === 'Trailer');
    if (trailer) {
      const videoSrc = `https://www.youtube.com/embed/${trailer.key}`;
      const instance = basicLightbox.create(`
        <iframe width="560" height="315" src="${videoSrc}" frameborder="0"></iframe>
      `);
      instance.show();
    } else {
      trailerButton.classList.add('is-hidden');
    }
  } catch (error) {
    console.error(`Error fetching trailer: ${error}`);
  }
}


function onTrailerButtonClick() {
  const trailerId = id;
  fetchTrailer(trailerId);
}

const trailerButton = document.querySelector('[data-trailer-url]');
trailerButton.addEventListener('click', onTrailerButtonClick);