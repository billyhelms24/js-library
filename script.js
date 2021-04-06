const Library = (() => {
    let library = [];

    const DisplayController = (() => {
        const table = document.querySelector("tbody");
        const rows = () => {
            return table.querySelectorAll("tr");
        };

        const updateDisplay = () => {
            rows().forEach((row) => {
                row.remove();
            });

            library.forEach((book) => {
                let tr = document.createElement("tr");
                for (const prop in book) {
                    let td = document.createElement("td");
                    td.textContent = book[prop];
                    tr.appendChild(td);
                }

                let changeBtn = document.createElement("button");
                changeBtn.textContent = "change";
                changeBtn.addEventListener("click", () => {
                    book.changeStatus();
                });
                let tdChange = document.createElement("td");
                tdChange.appendChild(changeBtn);
                tr.appendChild(tdChange);

                let delBtn = document.createElement("button");
                delBtn.textContent = "del";
                delBtn.addEventListener("click", () => {
                    removeBook(tr.dataset.index);
                });
                let tdDel = document.createElement("td");
                tdDel.appendChild(delBtn);
                tr.appendChild(tdDel);
                tr.dataset.index = rows().length;

                table.appendChild(tr);
            });
        };

        return {
            updateDisplay,
        };
    })();

    class Book {
        constructor(title, author, pages, finished) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.finished = finished;
            library.push(this);
            DisplayController.updateDisplay();
        }

        changeStatus() {
            if (this.finished) {
                this.finished = false;
            } else {
                this.finished = true;
            }
            DisplayController.updateDisplay();
        }
    }

    const removeBook = (index) => {
        library.splice(index, 1);
        DisplayController.updateDisplay();
    };

    const addBook = () => {
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = document.getElementById("pages").value;
        let finished = "";
        if (document.getElementById("finished-true").checked) {
            finished = true;
        } else {
            finished = false;
        }

        new Book(title, author, pages, finished);
        DisplayController.updateDisplay();
    };

    document.querySelector(".add-book").addEventListener("click", addBook);

    new Book("Eragon", "Christopher Paolini", 200, true);
    new Book("Eldest", "Christopher Paolini", 350, true);
})();
