import axios from 'axios';

const KEY = '29420321-cb2d4ffd30a3671bafcf37da7';

axios.defaults.baseURL = 'https://pixabay.com/api/'

async function fetchImg (query, currentPage, perPage) {
    const response = await axios.get(
      `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=${perPage}`,
    )
    return response
  }
export { fetchImg }