import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImg } from './components/fetchApi';
import { galleryRender } from './components/galleryRender';


const refs = {
   form: document.querySelector('.search-form'),
   gallery: document.querySelector('.gallery'),
   loadBtn: document.querySelector('.load-more')
}


let query = '';
let currentPage = 1;
const perPage = 40;

refs.form.addEventListener('submit', onFormSearch);
refs.loadBtn.addEventListener('click', onLoadMore)



function onFormSearch(e) {
   e.preventDefault();
   refs.gallery.innerHTML = '';
   query = e.currentTarget.elements.searchQuery.value.trim();
   if (!query) {
         return Notify.failure(
      'The search string cannot be empty. Please specify your search query.')
      }

   fetchImg(query, currentPage, perPage).then(({data}) => {
      if (data.totalHits === 0) {
       refs.loadBtn.classList.add("is-hidden")
         Notify.failure('Sorry, there are no images matching your search query. Please try again.')
         return
     } 
        galleryRender(data.hits)
        if (data.totalHits < perPage && data.totalHits === "") {
            return refs.loadBtn.classList.add("is-hidden");
          }
          return refs.loadBtn.classList.remove("is-hidden");
  }).catch(error => console.log(error));
}


function onLoadMore () {
  currentPage += 1
  
fetchImg(query, currentPage, perPage).then(({data}) => {
  if(data.totalHits === 0) {
      return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
  } else {
      galleryRender(data.hits)
      Notify.success(`Hooray! Left until the end ${data.totalHits - perPage * (page - 1)} images.`)
      const totalPages = Math.ceil(data.totalHits / perPage);
      if(currentPage > totalPages) {
        refs.loadBtn.classList.add("is-hidden");
        Notify.failure("We're sorry, but you've reached the end of search results.")
        return
      }
      return refs.loadBtn.classList.remove("is-hidden")
  }
}).catch(error => console.log(error))
}