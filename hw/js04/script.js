console.log('aaa')

const formCo = document.getElementById("app");


const form = document.createElement("form");
form.innerHTML = `
   <input type="number" id="firNum" placeholder="Pierwsza liczba" class="form-control mb-1" />
   <select class="form-select mb-1">
      <option value="+">+</option>
      <option value="-">-</option>
   </select>
   <input type="number" id="secNum" placeholder="Druga liczba" class="form-control mb-1" />
   <button type="submit" class="btn btn-primary mb-3" >Oblicz</button>
`;


formCo.appendChild(form);