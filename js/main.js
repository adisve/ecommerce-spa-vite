import '../scss/style.scss'
import { renderBadgeCount, renderNavBar } from './components/navbar';
import { renderHeader } from './components/header';
import { renderBookSection, renderBooksList } from './components/book_section';
import { store } from './store/store';
import { FilterType } from './utils/enums';
import { renderOffcanvasBody } from './components/offcanvas_body';
import { renderBookModal } from './components/book_modal';

document.querySelector('#app').innerHTML = `
  ${ renderNavBar() }
  ${ renderHeader() }
  ${ renderBookSection() }
  ${ renderBookModal() }
`

/* Render sections with initial state */
renderBooksList(store.getState());
renderOffcanvasBody(store.getState());

/**
 * Listen for onclick of cart button inside modal
 */
document.querySelector('#book-modal').querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const book = event.target.closest('[data-book]');
    if (book) {
      console.log('Adding')
      const bookData = JSON.parse(book.dataset.book);
      const state = store.getState();
      store.setState({ shoppingCart: [...state.shoppingCart, bookData] });
    }
  });
});

/**
 * Listen for onclick of list items in the category dropdown
 */
document.querySelector('#category-dropdown').addEventListener('click', (e) => {
  if (e.target && e.target.matches("li")) {
    const sortType = e.target.dataset.sortType;
    store.setState({ sortType: sortType })
  }
});

/**
 * Listen for onclick of list items in filter dropdown (search)
 */
document.querySelector('#filter-dropdown').addEventListener('click', (e) => {
  if (e.target && e.target.matches("li")) {
    console.log('Clicked')
    const filterType = e.target.dataset.filterType;
    if (filterType === FilterType.None) {
      document.querySelector('#input-group').disabled = true;
    } else {
      document.querySelector('#input-group').disabled = false;
    }
    store.setState({ filterType: filterType });
  }
});

/**
 * Event listener for search bar
 */
document.querySelector('#input-group').addEventListener('input', (event) => {
  const searchString = event.target.value;
  store.setState({ filterValue: searchString })
});

store.subscribe(renderBadgeCount);
store.subscribe(renderBooksList);
store.subscribe(renderOffcanvasBody);