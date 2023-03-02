import { FilterType, SortType } from "../utils/enums";
import { createBooksFromJSON, sortBooks, filterBooks } from '../utils/book_utils';
import booksJSON from '../../assets/books.json';
import { store } from "../store/store";
const books = createBooksFromJSON(booksJSON);


export function renderBookSection () {
  return `
  <div>
    <div id='filter-sorting' class='d-flex'>
      <div id="category-dropdown" class="dropdown">
          <button class="btn d-flex" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <p style="font-size: 18px;">Category</p>
            <i style="margin-left: 12px; margin-top: 7px;" class="fas fa-chevron-down"></i>
          </button>
          <ul id="category-dropdown-menu" class="dropdown-menu">${
            Object.keys(SortType).map((key) => {
              let sortType = SortType[key];
              return `<li class="dropdown-item" data-sort-type="${sortType}">${sortType}</li>`;
            })
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
            <ul id="filter-dropdown-menu" class="dropdown-menu" style="border-radius: 0px;" aria-labelledby="dropdownMenuButton">${
              Object.keys(FilterType).map((key) => {
                let filterType = FilterType[key];
                return `<li class="dropdown-item" data-filter-type="${filterType}">${filterType}</li>`;
              })
            }</ul>
          </div>
        </div>
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
export function renderBooksList() {
  const state = store.getState();
  const filteredSortedBooks = sortBooks(
    filterBooks(
      books,
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
                  <div style="position: relative; margin-right: 10px;">
                    <img class="shadow book-image" src=${`assets/book_covers/${book.image}`}></img>
                    <span class="badge bg-primary rounded-pill position-absolute" style="top: 0; right: 0;">$ ${book.price}</span>
                  </div>
                  <div class="container">
                    <div class="container" style="height: 138px;">
                      <p class="fw-light title">${book.title}</p>
                      <p class="fst-italic fw-light author" style="overflow: hidden; text-overflow: ellipsis;">${book.author}</p>
                    </div>
                    <div class="d-flex">
                      <button class="d-flex mt-4 btn"><i class="fas fa-shopping-cart mr-2" style="padding-top: 2px; padding-right: 10px;"></i><p>Add to cart</p></button>
                    </div>
                  </div>
                </div>
              </div>`
          )
          .join('')
      : `<h1>No books matching your description</h1>`;
}
