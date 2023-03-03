export class CartItem {
  constructor(title, numberOfBooksWithTitle, sum, author, id) {
    this.title = title;
    this.id = id;
    this.author = author;
    this.numberOfBooksWithTitle = numberOfBooksWithTitle;
    this.sum = sum;
  }
}