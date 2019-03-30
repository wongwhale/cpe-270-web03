// 1. Book Class: Represents a Book
class Book {
    constructor(name,gender,subject, email, phone) {
      this.name = name;
      this.gender = gender;
      this.subject = subject;
      this.email = email;
      this.phone = phone;
      
    }
  }
  
  // 2. UI Class: Handle UI Tasks
  class UI {
    static displayBooks() {
  // 3. predefined books
  //     const StoredBooks = [
  //       {
  //         name: 'Book One',
  //         email: 'John Boe',
  //         phone: '11111111'
  //       },
  //       {
  //         name: 'Book One',
  //         email: 'John Boe',
  //         phone: '11111111'
  //       }
  //     ];
  //     const books = StoredBooks;
       
      const books = Store.getBooks();
  
      books.forEach((book) => UI.addBookToList(book));
    }
  
  // 4. add book
    static addBookToList(book) {
      const list = document.querySelector('#book-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.name}</td>
        <td>${book.gender}</td>
        <td>${book.subject}</td>
        <td>${book.email}</td>
        <td>${book.phone}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
      `;
  
      list.appendChild(row);
    }
  
  // 11. delete book  
    static deleteBook(el) {
      // if element contains .delete class
      if(el.classList.contains('delete')) {
      // remove <a> -> <td> -> <tr>       
        el.parentElement.parentElement.remove();
      }
    }
  
  //13. show alert  
  //<div class="alert alert-success/alert-danger>Message</div>
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.index');
      const form = document.querySelector('#myForm');
      container.insertBefore(div, form);
  
      // Vanish in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
  // 9. clear fields  
    static clearFields() {
      document.querySelector('#name').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#phone').value = '';
      document.querySelector('#subject').value = '';
      document.getElementById('human').checked = false;
    }
  }
  
  // Store Class: Handles Storage
  class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(phone) {
      const books = Store.getBooks();
        
      books.forEach((book, index) => {
        if(book.phone === phone) {
            books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // 4. Event: Display Books
  document.addEventListener('DOMContentLoaded', UI.displayBooks);
  
  // 5. Event: Add a Book
  document.querySelector('#myForm').addEventListener('submit', (e) => {
    // 7. Prevent actual submit action
    e.preventDefault();
  
    // Get form values
    const name = document.querySelector('#name').value;
    const subject = document.querySelector('#subject').value;
    const male = document.getElementById('priority-low').checked;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const human = document.getElementById('human').checked;
    let gender;

    console.log(male.checked);

    if(male) gender = 'Male';
    else gender = 'Female';
    

    // 12. Validate
    if(name === '' || email === '' || phone === '' || subject === '') {
      UI.showAlert('Please fill in all fields', 'danger');
       //alert('Please fill in all data fields');
    }else if(!human){
        UI.showAlert('Please check "I am a human and not a robot" box', 'danger');
        //alert('Please check "I am a human and not a robot" box');
    }else {
      // 6. Instatiate book
      const book = new Book(name,gender,subject, email, phone);
      // console.log(book);
    
      
      // 8. Add Book to UI
      UI.addBookToList(book);
  
      // Add book to store
      Store.addBook(book);
  
      // 13. Show success message
      UI.showAlert('Contact Added', 'success');
      
  
      // 9. Clear fields
      UI.clearFields();
    }
  });
  
  // 10. Event: Remove a Book - event propagation by selecting the parent
  
  document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e.target);
    var a = e.target.parentElement.previousElementSibling.textContent;
    
    // 11. Remove book from UI
    UI.deleteBook(e.target);
  
    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
    // 13. Show success message
    UI.showAlert('Contact Removed', 'success');
  });