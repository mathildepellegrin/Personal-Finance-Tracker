// Base API URL
const API_URL = "http://localhost:3000/api";

// --- REGISTER ---
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("reg-username").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include"
  });

  const data = await res.json();
  alert(data.message || data.error);
});

// --- LOGIN ---
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include"
  });

  const data = await res.json();
  if (data.user) {
    document.getElementById("username").textContent =
      `${data.user.username} (${data.user.email})`;
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("tracker-section").style.display = "block";
    fetchExpenses();
  } else {
    alert(data.error);
  }
});

// --- LOGOUT ---
document.getElementById("logout-btn").addEventListener("click", async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("tracker-section").style.display = "none";
});

// --- EXPENSES ---

async function fetchExpenses() {
  const res = await fetch(`${API_URL}/expenses`, { credentials: "include" });
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
  await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
    credentials: "include"
  });
  fetchExpenses();
  e.target.reset();
});

// Initial fetch
fetchExpenses();
