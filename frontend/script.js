//fetch api calls
const API_URL = "http://localhost:5000/api/expenses";

async function fetchExpenses() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const table = document.getElementById("expenses-table");
  table.innerHTML = "";
  data.forEach(exp => {
    table.innerHTML += `
      <tr>
        <td>${exp.date}</td>
        <td>${exp.category}</td>
        <td>$${exp.amount}</td>
        <td>${exp.description || ""}</td>
      </tr>`;
  });
}

document.getElementById("expense-form").addEventListener("submit", async e => {
  e.preventDefault();
  const expense = {
    date: document.getElementById("date").value,
    category: document.getElementById("category").value,
    amount: document.getElementById("amount").value,
    description: document.getElementById("description").value
  };
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  });
  fetchExpenses();
  e.target.reset();
});

fetchExpenses();