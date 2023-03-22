/* eslint-disable */
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const form = document.getElementById('form');

const bookList = document.getElementById('books-list');

let books = [];

const reterevedBooks = localStorage.getItem('books');

class Book {
  constructor(title, author, id) {
    this.name = title;
    this.author = author;
    this.id = id;
  }

  static addBook() {
    const book = new Book(nameInput.value, authorInput.value);
    loadedBooks.push(book);
    localStorage.setItem(storageKey, JSON.stringify(loadedBooks));
    UI.loadBook();
    nameInput.value = '';
    authorInput.value = '';
    }
    
    static deleteBook(i) {
    loadedBooks.splice(i, 1);
    localStorage.setItem(storageKey, JSON.stringify(loadedBooks));
    UI.loadBook();
    }
}

if (reterevedBooks) {
  books.push(...JSON.parse(reterevedBooks));
  Book.bookLists();
  Book.removedBook();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (bookTitle.value.length !== 0 && bookAuthor.value.length !== 0) {
    if (books.length !== 0) {
      books.push({
        title: bookTitle.value,
        author: bookAuthor.value,
        id: books[books.length - 1].id + 1,
      });
      bookTitle.value = '';
      bookAuthor.value = '';
    } else {
      books.push({
        title: bookTitle.value,
        author: bookAuthor.value,
        id: 1,
      });
      bookTitle.value = '';
      bookAuthor.value = '';
    }

    localStorage.setItem('books', JSON.stringify(books));
    Book.bookLists();
    Book.removedBook();
  }
});
