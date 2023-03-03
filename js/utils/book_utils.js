import { Book } from "../models/Book";
import { CartItem } from "../models/cart_item";
import { SortType, FilterType } from "./enums";
import { stringSimilarity } from "./string_utils";
import { Images } from "../../assets/images";

export function filterBooks(books, filterType, filterValue, substringLength = 2, caseSensitive = false) {
  if (!filterValue || filterValue.length < substringLength) {
    return books;
  }

  let matchThreshold = 0;
  switch (filterType) {
    case FilterType.Title:
      matchThreshold = 0.4;
      break;
    case FilterType.Author:
    case FilterType.Category:
      matchThreshold = 0.5;
      break;
    case FilterType.None:
      return books;
    default:
      throw new Error('Invalid filter type');
  }

  const similarityFn = (str1, str2) => stringSimilarity(str1, str2, substringLength, caseSensitive);
  const matchFn = (book) => {
    let fieldValue;
    switch (filterType) {
      case FilterType.Author:
        fieldValue = book.author;
        break;
      case FilterType.Category:
        fieldValue = book.category;
        break;
      case FilterType.Title:
        fieldValue = book.title;
        break;
    }
    return similarityFn(fieldValue, filterValue) >= matchThreshold;
  };

  return books.filter(matchFn);
}


export function sortBooks(books, sortType) {
  switch (sortType) {
    case SortType.AuthorAscending:
      books.sort((bookA, bookB) => bookA.author.localeCompare(bookB.author));
      break;
    case SortType.AuthorDescending:
      books.sort((bookA, bookB) => bookB.author.localeCompare(bookA.author));
      break;
    case SortType.TitleAscending:
      books.sort((bookA, bookB) => bookA.title.localeCompare(bookB.title));
      break;
    case SortType.TitleDescending:
      books.sort((bookA, bookB) => bookB.title.localeCompare(bookA.title));
      break;
    case SortType.PriceAscending:
      books.sort((bookA, bookB) => bookA.price - bookB.price);
      break;
    case SortType.PriceDescending:
      books.sort((bookA, bookB) => bookB.price - bookA.price);
      break;
    case SortType.None:
      // No sorting necessary, do nothing
      break;
    default:
      throw new Error('Invalid sort type');
  }
  return books;
}


export function createBooksFromJSON(booksJSON) {
  return booksJSON.map((bookJSON, index) => {
    const { id, title, author, description, category, price } = bookJSON;
    return new Book(id, title, author, description, category, price, Images[index]);
  });
}


export function convertBooksToCartItems(books) {
  const cartItems = [];
  // Iterate through each book and create a CartItem for each unique title
  books.forEach(book => {
    const existingCartItem = cartItems.find(item => item.title === book.title);
    
    if (existingCartItem) {
      // If a CartItem already exists for the title, update its count and sum
      existingCartItem.numberOfBooksWithTitle++;
      existingCartItem.sum += book.price;
    } else {
      // Otherwise, create a new CartItem
      const newCartItem = new CartItem(book.title, 1, book.price, book.author, book.id);
      cartItems.push(newCartItem);
    }
  });
  
  return cartItems;
}


export function getTotalPrice(books) {
  const totalPrice = books.reduce((sum, book) => sum + book.price, 0);
  return totalPrice;
}