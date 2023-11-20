const formContainer = document.getElementById("app");

const form = document.createElement("form");
form.setAttribute("id", "form");
form.innerHTML = `
   <input type="number" id="firNum" placeholder="Pierwsza liczba" class="form-control mb-1" />
   <select id="operator" class="form-select mb-1">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
   </select>
   <input type="number" id="secNum" placeholder="Druga liczba" class="form-control mb-1" />
   <button type="submit" class="btn btn-primary mb-3"" >Oblicz</button>
`;

formContainer.appendChild(form);

const calculate = (operation, firstNumber, secondNumber) => {
  switch (operation) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    case "/":
      return firstNumber / secondNumber;
  }
};

const submitForm = (event) => {
  event.preventDefault();

  const operation = document.getElementById("operator").value;
  const firstNumber = parseFloat(document.getElementById("firNum").value);
  const secondNumber = parseFloat(document.getElementById("secNum").value);

  const result = calculate(operation, firstNumber, secondNumber);
  displayResult(result, operation, firstNumber, secondNumber);
};

const displayResult = (result, operation, firstNumber, secondNumber) => {
  const res = document.createElement("div");
  console.log(result);
  if (!isNaN(result)) {
    res.innerHTML = `${firstNumber} ${operation} ${secondNumber} = ${result}`;
    res.className = "alert alert-success";
  } else {
    res.innerHTML = `Błędne dane`;
    res.className = "alert alert-danger";
  }
  formContainer.appendChild(res);
};

document.getElementById("form").addEventListener("submit", submitForm);
