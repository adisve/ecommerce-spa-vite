import '../scss/style.scss'
import 'bootstrap/dist/js/bootstrap.bundle';
import { renderNavBar } from './components/navbar';
import { renderHeader } from './components/header';
import { renderBookSection, renderBooksList } from './components/bookSection';
import { store } from './store/store';
import { FilterType } from './utils/enums';
import { renderOffcanvasBody } from './components/offcanvas';

document.querySelector('#app').innerHTML = `
  ${ renderNavBar() }
  ${ renderHeader() }
  ${ renderBookSection() }
`

renderBooksList();

/**
 * Event listener for onclick of list items in the category dropdown
 */
document.querySelector('#category-dropdown').addEventListener('click', (e) => {
  if (e.target && e.target.matches("li")) {
    const sortType = e.target.dataset.sortType;
    store.getState().sortType = sortType
    renderBooksList();
  }
});

/**
 * Event listener for onclick of list items in filter dropdown (search)
 */
document.querySelector('#filter-dropdown').addEventListener('click', (e) => {
  if (e.target && e.target.matches("li")) {
    const state = store.getState();
    const filterType = e.target.dataset.filterType;
    state.filterType = filterType
    const inputGroup = document.getElementById("input-group");
    if (state.filterType === FilterType.None) {
      inputGroup.disabled = true;
    } else {
      inputGroup.disabled = false;
    }
    renderBooksList();
  }
});

/**
 * Event listener for search bar
 */
document.querySelector('#input-group').addEventListener('input', (event) => {
  const searchString = event.target.value;
  const state = store.getState();
  state.filterValue = searchString;
  renderBooksList();
});


document.querySelector('#cart').addEventListener('click', () => {
  renderOffcanvasBody();
});


document.querySelector('#book-list').querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const bookElement = event.target.closest('[data-book]');
    const bookData = JSON.parse(bookElement.dataset.book);
    const state = store.getState();
    store.setState({ shoppingCart: [...state.shoppingCart, bookData] });
  });
});


function renderBadgeCount(state) {
  const badgeCount = state.shoppingCart.length;
  document.querySelector('#badge-count').textContent = badgeCount;
}

store.subscribe(renderBadgeCount);