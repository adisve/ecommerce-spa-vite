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

/* Render sections with initial state */
renderBooksList(store.getState());
renderOffcanvasBody(store.getState());

/**
 * Event listener for onclick of list items in the category dropdown
 */
document.querySelector('#category-dropdown').addEventListener('click', (e) => {
  if (e.target && e.target.matches("li")) {
    const sortType = e.target.dataset.sortType;
    store.setState({ sortType: sortType })
  }
});

/**
 * Event listener for onclick of list items in filter dropdown (search)
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

function renderBadgeCount(state) {
  const badgeCount = state.shoppingCart.length;
  document.querySelector('#badge-count').textContent = badgeCount;
}

store.subscribe(renderBadgeCount);
store.subscribe(renderBooksList);
store.subscribe(renderOffcanvasBody);