let myLibrary = [];
const table = document.querySelector("table");
const newBookBtn = document.querySelector(".add-book");

function Book(title, author, pages, finished) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.finished = finished;
    this.changeStatus = () => {
        if (this.finished) {
            this.finished = false;
        } else {
            this.finished = true;
        }

        displayBooks();
    };
}

// removes book from myLibrary by index
function removeBooks(index) {
    myLibrary.splice(index, 1);

    displayBooks();
}

// clears all books from display, then re-displays them with updates
function displayBooks() {
    const data = document.querySelectorAll("tr");

    let j = 0;

    for (let i = 1; i < data.length; i++) {
        data[i].remove();
    }

    myLibrary.forEach((book) => {
        let row = document.createElement("tr");
        for (const prop in book) {
            if (typeof book[prop] != "function") {
                let data = document.createElement("td");
                data.innerHTML = book[prop];
                row.appendChild(data);
            }
        }

        let change = document.createElement("button");
        change.innerHTML = "CHANGE";
        change.addEventListener("click", () => {
            book.changeStatus();
        });

        delTD = document.createElement("td");
        changeTD = delTD;
        changeTD.appendChild(change);

        row.appendChild(changeTD);
        let del = document.createElement("button");
        del.innerHTML = "X";
        del.addEventListener("click", () => {
            removeBooks(row.dataset.index);
        });

        row.appendChild(delTD.appendChild(del));

        row.dataset.index = j;
        table.appendChild(row);

        j++;
    });
}

const form = document.querySelector("form");

function addBookToLibrary() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    let finished = "";
    if (document.getElementById("finished-true").checked) {
        finished = true;
    } else {
        finished = false;
    }

    const book = new Book(title, author, pages, finished);
    myLibrary.push(book);
    displayBooks();
}

newBookBtn.addEventListener("click", () => {
    addBookToLibrary();
});

myLibrary[0] = new Book("Eragon", "Christopher Paolini", "250", true);
myLibrary[1] = new Book("Eldest", "Christopher Paolini", "350", true);
myLibrary[2] = new Book("Brisingr", "Christopher Paolini", "450", true);
myLibrary[3] = new Book("Inheritance", "Christopher Paolini", "550", true);
myLibrary[4] = new Book(
    "The Fork, the Witch, and the Worm",
    "Christopher Paolini",
    "150",
    false
);
displayBooks();
