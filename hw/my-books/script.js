class BooksManager {
   constructor() {
       this.listContainer = document.getElementById("list");
       this.searchInput = document.getElementById("search");
       this.sortSelect = document.getElementById("sort");
       this.ascendingButton = document.getElementById("ascending");
       this.descendingButton = document.getElementById("descending");

       this.searchInput.addEventListener("input", () => this.renderList());
       this.sortSelect.addEventListener("change", this.handleSort.bind(this)); 
       this.ascendingButton.addEventListener("click", () => this.handleSort("ascending")); 
       this.descendingButton.addEventListener("click", () => this.handleSort("descending")); 

       this.list = [];
       this.books = [];


       this.api();
      
       }

       api() {
         fetch('https://openlibrary.org/subjects/javascript.json')
           .then(response => response.json())
           .then(data => {
             console.log(data);
             this.list = data.works;
     
             this.books = this.list.map((item) => ({
               name: item.title,
               author: item.authors.map((author) => author.name).join(", "),
             }));
     
             this.renderList();
           })
           .catch(err => console.log('Blad: ', err));
       }
       

       filterList(searchText) {
         return this.books.filter((item) => {
           return (
             item.name.toLowerCase().includes(searchText) ||
             item.author.toLowerCase().includes(searchText)
           );
         });
       }
     
       handleSort(order) {
         const selectedOption = this.sortSelect.value;
         if (selectedOption === "title") {
           if (order === "ascending") {
             this.books.sort((a, b) => a.name.localeCompare(b.name));
           } else if (order === "descending") {
             this.books.sort((a, b) => b.name.localeCompare(a.name));
           }
         } else if (selectedOption === "author") {
           if (order === "ascending") {
             this.books.sort((a, b) => a.author.localeCompare(b.author));
           } else if (order === "descending") {
             this.books.sort((a, b) => b.author.localeCompare(a.author));
           }
         }
         this.renderList();
       }
     
       renderList() {
         console.log(this.books)
         this.listContainer.innerHTML = "";
         const searchText = this.searchInput.value.trim().toLowerCase();
         const filteredList = this.filterList(searchText);
     
         filteredList.forEach((item) => {
           const listItem = document.createElement("li");
           listItem.className =
             "m-2 w-80 bg-white rounded-lg shadow-md px-6 py-4";
           listItem.innerHTML = `
             <p class="font-bold text-xl">${item.name}</p>
             <span class="text-gray-700">${item.author}</span>
           `;
     
           this.listContainer.appendChild(listItem);
         });
       }
     }
     
     const booksManager = new BooksManager();