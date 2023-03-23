//Header Navbar.
const navs = document.querySelectorAll('nav ul li');
navs.forEach((element) => {
  element.addEventListener('click', () => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
      tab.classList.add('blocked');
    });
    document.querySelector('.current').classList.remove('current');
    const tabId = element.getAttribute('class');
    document.querySelector(`#${tabId}`).classList.remove('blocked');
    element.classList.add('current');
  });
});


const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const form = document.getElementById('form');

const bookList = document.getElementById('books-list');

class BookList {
  constructor() {
    this.books = [];
  }

  addBook() {
    if (bookTitle.value.length !== 0 && bookAuthor.value.length !== 0) {
      if (this.books.length !== 0) {
        this.books.push({
          title: bookTitle.value,
          author: bookAuthor.value,
          id: this.books[this.books.length - 1].id + 1,
        });
        bookTitle.value = '';
        bookAuthor.value = '';
      } else {
        this.books.push({
          title: bookTitle.value,
          author: bookAuthor.value,
          id: 1,
        });
        bookTitle.value = '';
        bookAuthor.value = '';
      }

      localStorage.setItem('books', JSON.stringify(this.books));
      this.renderBooks();
      this.setRemoveEventListeners();
    }
  }

  renderBooks() {
    let finalHtml = '';
    let i = 0;
    this.books.forEach((book) => {
      let grayBg = '';
      if (i % 2 === 0) {
        grayBg = 'gray-bg';
      }
      const htmlContent = `
        <div class="books ${grayBg}">
          <p>"${book.title}" By ${book.author}</p>
          <button id="remove-${book.id}"> Remove </button>
        </div>
      `;
      i += 1;
      finalHtml += htmlContent;
    });
    bookList.innerHTML = `<div class="book-wrapper">${finalHtml}</div>`;
  }

  setRemoveEventListeners() {
    this.books.forEach((book) => {
      const removeBtn = document.getElementById(`remove-${book.id}`);
      removeBtn.addEventListener('click', () => {
        this.books = this.books.filter((element) => element.id !== book.id);

        localStorage.setItem('books', JSON.stringify(this.books));
        this.renderBooks();
        this.setRemoveEventListeners();
      });
    });
  }
}

const booksList = new BookList();

const reterevedBooks = localStorage.getItem('books');

if (reterevedBooks) {
  booksList.books.push(...JSON.parse(reterevedBooks));
  booksList.renderBooks();
  booksList.setRemoveEventListeners();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  booksList.addBook();
});
