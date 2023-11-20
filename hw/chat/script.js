class ListManager {
   constructor() {
       this.list = JSON.parse(localStorage.getItem("myList")) || [];
       this.listContainer = document.getElementById("list");
       this.authorErrorMessage = document.getElementById('author-error');
       this.authorInput = document.getElementById('author');
       this.messageErrorMessage = document.getElementById('message-error');
       this.messageInput = document.getElementById('message');
       this.addButton = document.querySelector("button[type=submit]"); 
       this.searchInput = document.getElementById("search");


       this.addButton.addEventListener("click", (e) => this.addItem(e));
       this.authorInput.addEventListener("input", () => this.validateAuthorField());
       this.messageInput.addEventListener("input", () => this.validateMessageField());
       this.searchInput.addEventListener("input", () => this.renderList());

       this.renderList();
   }

   validateAuthorField() {
       const authorValue = this.authorInput.value;
       if (!authorValue) {
           this.authorErrorMessage.innerText = 'Pole wymagane!';
           this.authorInput.classList.add('border-red-500');
           return false;
       }
       this.authorErrorMessage.innerText = '';
       this.authorInput.classList.remove('border-red-500');
       return true;
   }

   validateMessageField() {
       const messageValue = this.messageInput.value;
       if (!messageValue) {
           this.messageErrorMessage.innerText = 'Pole wymagane!';
           this.messageInput.classList.add('border-red-500');
           return false;
       }
       if (messageValue.length < 2) {
           this.messageErrorMessage.innerText = 'Pole musi mieć co najmniej 2 znaki!';
           this.messageInput.classList.add('border-red-500');
           return false;
       }
       this.messageErrorMessage.innerText = '';
       this.messageInput.classList.remove('border-red-500');
       return true;
   }
   
   filterList(searchText) {
       return this.list.filter(item => {
           return item.author.toLowerCase().includes(searchText.toLowerCase()) || item.message.toLowerCase().includes(searchText.toLowerCase());
       });
   }

   renderList() {
       this.listContainer.innerHTML = "";
       const searchText = this.searchInput.value.trim().toLowerCase();
       const filteredList = this.filterList(searchText);
       filteredList.map((item, index) => {
           const listItem = document.createElement("li");
           listItem.className = "m-2 w-80 bg-white rounded-lg shadow-md px-6 py-4";
           listItem.innerHTML = `
               <p class="font-bold text-xl">${item.author}</p>
               <span class="text-gray-700" >${item.message}</span>
               <div class="px-2 py-4">
               <button class="text-green-700 font-semibold py-1 px-2 border border-green-500 rounded ${item.liked && 'bg-green-500'} " id="btn-liked" >👍</button>
               <button class="text-red-700 font-semibold py-1 px-2 border border-red-500 rounded ${item.disliked && 'bg-red-500'} " id="btn-disliked">👎</button>
               <button class="bg-transparent text-red-700 font-semibold hover:text-red py-1 px-2 border border-red-500 rounded" id="removeButton">Usuń</button>
               </div>
           `;

           this.listContainer.appendChild(listItem);
           const likeButton = listItem.querySelector("#btn-liked");
           likeButton.addEventListener("click", () => this.handleLike(item));

           const disLikeButton = listItem.querySelector("#btn-disliked");
           disLikeButton.addEventListener("click", () => this.handleDislike(item));

           const removeButton = listItem.querySelector("#removeButton");
           removeButton.addEventListener("click", () => this.removeItem(index));
       });
   }


handleLike(item) {
   console.log(item)
   item.liked = true;
   item.disliked = false;
   this.saveListToLocalStorage();
   this.renderList();
}

handleDislike(item) {
   item.liked = false;
   item.disliked = true;
   this.saveListToLocalStorage();
   this.renderList();
}
   addItem(e) {
       e.preventDefault();
       if (this.validateAuthorField() && this.validateMessageField()) {
           const author = this.authorInput.value;
           const message = this.messageInput.value;
           this.list.push({ author, message, liked: true, disliked: false });
           this.renderList();
           this.saveListToLocalStorage();
           this.authorInput.value = '';
           this.messageInput.value = '';
       }
   }

   removeItem(index) {
       if (index >= 0 && index < this.list.length) {
           this.list.splice(index, 1);
           this.renderList();
           this.saveListToLocalStorage();
       }
   }

   saveListToLocalStorage() {
       localStorage.setItem("myList", JSON.stringify(this.list));
   }
}

const listManager = new ListManager();