class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

class UI {

    addBookToList(myBook) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${myBook.title}</td>
        <td>${myBook.author}</td>
        <td>${myBook.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row);
    };


    clearField() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    };

    showAlert(message, className) {
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
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 1500);

    };

    deleteBook(target) {
        if (target.className === 'delete') {
            //delete the whole row tr
            target.parentElement.parentElement.remove();
        }
    };

};

//add event listener for submit & get book details
document.getElementById('book-form').addEventListener('submit', function (e) {

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

});






//add event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    //instantiate UI object
    const myUI = new UI();

    myUI.deleteBook(e.target);

    //Show alert message after delete
    myUI.showAlert('Book removed!', 'success');
    e.preventDefault()
});