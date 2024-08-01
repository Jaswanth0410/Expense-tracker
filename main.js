const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalElement = document.getElementById('total');
const filterSelect = document.getElementById('filter');

let expenses = [];

// Function to add an expense
function addExpense(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  if (name && amount && category && date) {
    const expense = { name, amount, category, date };
    expenses.push(expense);
    updateExpenseList();
    updateTotal();
    clearForm();
  }
}

// Function to update the expense list
function updateExpenseList() {
  expenseList.innerHTML = '';

  expenses.forEach(expense => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>
    `;
    expenseList.appendChild(row);

    // Add event listeners for edit and delete buttons
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
      // Implement edit functionality here
      console.log('Edit button clicked');
    });

    deleteBtn.addEventListener('click', () => {
      // Implement delete functionality here
      console.log('Delete button clicked');
      expenses = expenses.filter(item => item !== expense);
      updateExpenseList();
      updateTotal();
    });
  });
}

// Function to calculate and update the total
function updateTotal() {
  const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  totalElement.textContent = total.toFixed(2);
}

// Function to clear the expense form
function clearForm() {
  document.getElementById('name').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('category').value = 'Food'; // Default category
  document.getElementById('date').value = '';
}

// Function to filter expenses by category
function filterExpenses(category) {
  const filteredExpenses = category === 'all' ? expenses : expenses.filter(expense => expense.category === category);
  updateExpenseList(filteredExpenses);
}

// Event listeners
expenseForm.addEventListener('submit', addExpense);
filterSelect.addEventListener('change', (event) => filterExpenses(event.target.value));

// Initial call to update the expense list
updateExpenseList();
updateTotal();
