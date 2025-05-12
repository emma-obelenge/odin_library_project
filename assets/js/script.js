// Library Array
const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID(); // Unique ID
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Add Book to Library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Display Books
function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Clear existing books

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-id", book.id);

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
      <p>Read: ${book.read}</p>
      <button class="toggle-read-btn">${
        book.read === "yes" ? "Mark as Unread" : "Mark as Read"
      }</button>
      <button class="remove-btn">Remove</button>
    `;

    // Toggle Read Status
    bookCard.querySelector(".toggle-read-btn").addEventListener("click", () => {
      book.read = book.read === "yes" ? "no" : "yes";
      displayBooks();
    });

    // Remove Book
    bookCard.querySelector(".remove-btn").addEventListener("click", () => {
      const index = myLibrary.findIndex((b) => b.id === book.id);
      myLibrary.splice(index, 1);
      displayBooks();
    });

    bookList.appendChild(bookCard);
  });
}

// Handle New Book Form
const newBookForm = document.getElementById("new-book-form");
newBookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;

  addBookToLibrary(title, author, pages, read);
  newBookForm.reset();
  document.getElementById("new-book-dialog").close();
});

// Open and Close Dialog
const newBookDialog = document.getElementById("new-book-dialog");
document.getElementById("new-book-btn").addEventListener("click", () => {
  newBookDialog.showModal();
});
document.getElementById("close-dialog").addEventListener("click", () => {
  newBookDialog.close();
});

// Add Sample Books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "yes");
addBookToLibrary("1984", "George Orwell", 328, "no");
