//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI constructor
function UI() {

}

//Add Book to List prototype for UI
UI.prototype.addBookToList = function (myBook) {

    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${myBook.title}</td>
    <td>${myBook.author}</td>
    <td>${myBook.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row);
    // console.log(row);

}

//clear field UI prototype
UI.prototype.clearField = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

//Show alert prototype for UI
UI.prototype.showAlert = function (message, className) {
    //create div
    const div = document.createElement('div');
    //add class using clasName
    div.className = `alert ${className}`;
    //add text using message
    div.appendChild(document.createTextNode(message));

    //insert the div between container and book-form
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');

    //insert the new div before the first child element(book-form) of container element
    container.insertBefore(div, form);
    // console.log(div);


    //time out after 3 seconds
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 2500);
}

//add event listener
document.getElementById('book-form').addEventListener('submit', getBookDetails);


//get book details
function getBookDetails(e) {

    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    const myBook = new Book(title, author, isbn);

    //instantiate UI object
    const myUI = new UI();

    //validate input
    if (title === '' || author === '' || isbn === '') {
        myUI.showAlert('Please fill in all the fields', 'error');
    } else {
        //Add book to list
        myUI.addBookToList(myBook);

        //clear field
        myUI.clearField();

        myUI.showAlert('Book added successfully', 'success');

    }


    // console.log(myUI);

    e.preventDefault();

}