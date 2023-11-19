class ListManager {
   constructor() {
       this.listContainer = document.getElementById("list");
       this.searchInput = document.getElementById("search");
       this.sortSelect = document.getElementById("sort");
       this.ascendingButton = document.getElementById("ascending");
       this.descendingButton = document.getElementById("descending");

       this.searchInput.addEventListener("input", () => this.renderList());
       this.tableHeaders = document.querySelectorAll("thead th");
       this.currentSortOrder = "ascending";

       this.tableHeaders.forEach((header, index) => {
           header.addEventListener("click", () => this.handleColumnSort(index));
       });

       this.list = [];
       this.user = [];


       this.api();
      
       }

       api() {
         fetch('https://jsonplaceholder.typicode.com/users')
           .then(response => response.json())
           .then(data => {
             console.log(data);
             this.user = data;
     
     
             this.renderList();
           })
           .catch(err => console.log('Blad: ', err));
       }
       

       filterList(searchText) {
         return this.user.filter((item) => {
           return (
             item.username.toLowerCase().includes(searchText) ||
             item.name.toLowerCase().includes(searchText) ||
             item.email.toLowerCase().includes(searchText) ||
             item.phone.toLowerCase().includes(searchText) ||
             item.address.city.toLowerCase().includes(searchText) ||
             item.company.name.toLowerCase().includes(searchText)
           );
         });
       }
     
       handleColumnSort(columnIndex) {
        const columnId = this.tableHeaders[columnIndex].getAttribute("data-id");
        if (this.currentSortOrder === "ascending") {
            this.user.sort((a, b) => a[columnId].localeCompare(b[columnId]));
        } else {
            this.user.sort((a, b) => b[columnId].localeCompare(a[columnId]));
        }
 
        this.currentSortOrder = this.currentSortOrder === "ascending" ? "descending" : "ascending";
 
        this.renderList();
    }
     
       renderList() {
         console.log(this.user)
         this.listContainer.innerHTML = "";
         const searchText = this.searchInput.value.trim().toLowerCase();
         const filteredList = this.filterList(searchText);
     
         filteredList.forEach((item) => {
           const listItem = document.createElement("tr");
           listItem.className =
             "bg-white border-b dark:bg-gray-800 dark:border-gray-700";
           listItem.innerHTML = `
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${item.username}</th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${item.name}</th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${item.email}</th>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">${item.phone}</th>
           `;
     
           this.listContainer.appendChild(listItem);
         });
       }
     }
     
     const listManager = new ListManager();