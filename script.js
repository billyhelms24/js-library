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
            updateStorage();
        }
    }

    const removeBook = (index) => {
        library.splice(index, 1);
        DisplayController.updateDisplay();
        updateStorage();
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
        updateStorage();
    };

    document.querySelector(".add-book").addEventListener("click", addBook);

    const createStorage = () => {
        library.forEach((book) => {
            for (let prop in book) {
                localStorage.setItem(
                    `${library.indexOf(book)}${prop}`,
                    `${book[prop]}`
                );
            }
        });
        console.log(localStorage);
    };

    const loadStorage = () => {
        for (let i = 0; i < localStorage.length / 4; i++) {
            new Book(
                localStorage.getItem(`${i}title`),
                localStorage.getItem(`${i}author`),
                localStorage.getItem(`${i}pages`),
                localStorage.getItem(`${i}finished`)
            );
        }
    };

    const updateStorage = () => {
        localStorage.clear();
        createStorage();
    };

    if (!localStorage.getItem("0author")) {
        new Book("Eragon", "Christopher Paolini", 200, true);
        new Book("Eldest", "Christopher Paolini", 350, true);
        new Book("Brisingr", "Christopher Paolini", 450, true);
        new Book("Inheritance", "Christopher Paolini", 550, true);
        new Book(
            "The Fork, the Witch, and the Worm",
            "Christopher Paolini",
            150,
            false
        );
        console.log(library);
        createStorage();
    } else {
        loadStorage();
    }
})();
