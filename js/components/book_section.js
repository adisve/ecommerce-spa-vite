import { FilterSearchType, SortType } from "../utils/enums";
import { createBooksFromJSON, sortBooks, filterBooksBySearch, filterBooksByPrice } from '../utils/book_utils';
import booksJSON from '../../assets/books.json';
import { store } from "../store/store";
const books = createBooksFromJSON(booksJSON);
import { Modal } from 'bootstrap';

export function renderBookSection () {
  return `
  <div>
    <div id='filter-sorting' class='d-flex'>
      <div id="category-dropdown" class="dropdown">
        <button class="btn d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <p>Category</p>
          <i style="margin-left: 12px; margin-top: 7px;" class="fas fa-chevron-down"></i>
        </button>
        <ul id="category-dropdown-menu" class="dropdown-menu">${
          Object.keys(SortType).map((key) => {
            let sortType = SortType[key];
            return `<li class="dropdown-item" data-sort-type="${sortType}">${sortType}</li>`;
          }).join('')
        }</ul>
      </div>
      <div class='d-flex' id='filter-dropdown'>
        <div class="input-group">
          <input id="input-group" disabled type="text" class="form-control" placeholder="Search for books .." aria-label="Text input with dropdown button">
        </div>
        <div class="dropdown" style="padding-right: 10px;">
          <button style="margin-left: 10px;" class="btn d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-chevron-down"></i>
          </button>
          <ul id="filter-dropdown-menu" class="dropdown-menu" aria-labelledby="dropdownMenuButton">${
            Object.keys(FilterSearchType).map((key) => {
              let filterType = FilterSearchType[key];
              return `<li class="dropdown-item" data-filter-type="${filterType}">${filterType}</li>`;
            }).join('')
          }</ul>
        </div>
      </div>
    </div>
    <div class="dropdown" id="price-range-dropdown">
        <button class="btn d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <p>Price range</p>
          <i style="margin-left: 12px; margin-top: 7px;" class="fas fa-chevron-down"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="price-range-button">
          <li class="dropdown-item" data-min-price="0" data-max-price="25">$0 - $25</li>
          <li class="dropdown-item" data-min-price="0" data-max-price="50">$0 - $50</li>
          <li class="dropdown-item" data-min-price="0" data-max-price="75">$0 - $75</li>
        </ul>
      </div>
    <div>
      <div class='d-flex'>
        <div class='container'>
          <div id="book-list" class="row"></div>
        </div>
      </div>
    </div>
  </div>
  `;
}




/**
 * Render list of books based on filter type and sort type specified
 * in the current store state
 */
export function renderBooksList(state) {
  const filteredSortedBooks = sortBooks(
    filterBooksBySearch(
      filterBooksByPrice(books, state.filterPriceMinMax[0], state.filterPriceMinMax[1]),
      state.filterType,
      state.filterValue
    ),
    state.sortType
  );
  document.querySelector('#book-list').innerHTML =
    filteredSortedBooks.length > 0
      ? filteredSortedBooks
          .map(
            (book) =>
              `<div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4 mb-5" 
                data-book='${JSON.stringify(book)}'>
                <div class="d-flex">
                  <div class="book-img-container" style="position: relative; margin-right: 10px;">
                    <img draggable="false" class="shadow book-image" src=${`assets/book_covers/${book.image}`}></img>
                    <span class="badge bg-primary rounded-pill position-absolute" style="top: 0; right: 0;">$ ${book.price}</span>
                  </div>
                  <div class="container">
                    <div class="container" style="height: 138px;">
                      <p class="fw-light title">${book.title}</p>
                      <p class="fst-italic fw-light author" style="overflow: hidden; text-overflow: ellipsis;">${book.author}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <button class="d-flex mt-4 btn">
                        <i class="fas fa-shopping-cart mr-2" style="padding-top: 4px; padding-right: 10px;"></i>
                        <p>Add to cart</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`
          )
          .join('')
      : `<h1>No books matching your description</h1>`;

  attachCartButtonListeners();
  attachImageButtonListeners();
}


function attachCartButtonListeners () {
  document.querySelector('#book-list').querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const book = event.target.closest('[data-book]');
      if (book) {
        const bookData = JSON.parse(book.dataset.book);
        const state = store.getState();
        store.setState({ shoppingCart: [...state.shoppingCart, bookData] });
      }
    });
  });
}

function attachImageButtonListeners() {
  const infoBtns = document.querySelectorAll('.book-img-container');
  infoBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const book = event.target.closest('[data-book]');
      if (book) {
        const bookData = JSON.parse(book.dataset.book);
        const modal = new Modal(document.querySelector('#book-modal'));
        // Set data-book attribute value to book data JSON string
        modal._element.setAttribute('data-book', JSON.stringify(bookData));
        modal.show();
        // Update modal content with book details
        document.querySelector('#modal-book-title').innerText = bookData.title;
        document.querySelector('#modal-book-author').innerText = `by ${bookData.author}`;
        document.querySelector('#modal-book-image').src = `assets/book_covers/${bookData.image}`;
        document.querySelector('#modal-book-description').innerText = bookData.description;
      }
    });
  });
}
