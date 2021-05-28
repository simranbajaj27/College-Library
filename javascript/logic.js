console.log("Welcome");

class Book {
    constructor(name, author, category) {
        this.name = name;
        this.author = author;
        this.category = category;
    }
}

class Display {

    add(book) {
        let books=localStorage.getItem('books');
        let bookObj;
        if(books==null){
            bookObj=[];
        }
        else{
            bookObj=JSON.parse(books);
        }
        bookObj.push(book);

        let str = "";
        let table = document.getElementById('table');
        table.innerHTML ="";
        bookObj.forEach(element => {
            str+=`
            <tr>
              <td>${element.name}</td>
              <td>${element.author}</td>
              <td>${element.category}</td>
            </tr>
            ` 
        });

        table.innerHTML += str;
        books=JSON.stringify(bookObj);
        localStorage.setItem('books',books);
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();

    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = ''
        }, 5000);
    }

}


let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    let name = document.getElementById('name').value;
    let author = document.getElementById('author').value;
    let category;
    let fiction = document.getElementById('fiction');
    let nonfiction = document.getElementById('nonfiction');
    let educational = document.getElementById('educational');
    if (fiction.checked) {
        category = fiction.value;
    }
    else if (nonfiction.checked) {
        category = nonfiction.value;
    }
    else if (educational.checked) {
        category = educational.value;
    }
    let book = new Book(name, author, category);
    //console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been successfully added');
    }
    else {
        display.show('danger', 'Sorry you cannot add this book');
    }
    e.preventDefault();
}