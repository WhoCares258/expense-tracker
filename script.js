// ==========================
//  INITIAL SAMPLE DATA
// ==========================
let expenses = [
  // 2025
  { title: "Groceries", amount: 120, date: new Date("2025-01-15") },
  { title: "Electricity Bill", amount: 90, date: new Date("2025-02-10") },
  { title: "Internet Subscription", amount: 60, date: new Date("2025-07-25") },
  { title: "Gym Membership", amount: 200, date: new Date("2025-07-05") },
  { title: "Car Insurance", amount: 400, date: new Date("2025-03-22") },
  { title: "Netflix Subscription", amount: 50, date: new Date("2025-04-08") },
  { title: "Dining Out", amount: 175, date: new Date("2025-05-14") },
  { title: "Vacation Flight", amount: 950, date: new Date("2025-06-02") },
  { title: "Phone Bill", amount: 75, date: new Date("2025-09-10") },
  { title: "Fuel", amount: 140, date: new Date("2025-10-12") },
  { title: "Medical Checkup", amount: 320, date: new Date("2025-11-18") },
  { title: "Gift Shopping", amount: 260, date: new Date("2025-12-22") },

  // 2024
  { title: "Groceries", amount: 110, date: new Date("2024-01-06") },
  { title: "Car Maintenance", amount: 280, date: new Date("2024-02-18") },
  { title: "Water Bill", amount: 55, date: new Date("2024-03-10") },
  { title: "Vacation Hotel", amount: 700, date: new Date("2024-04-25") },
  { title: "Fuel", amount: 130, date: new Date("2024-05-12") },
  { title: "New Laptop", amount: 2200, date: new Date("2024-06-30") },
  { title: "Dining Out", amount: 145, date: new Date("2024-07-09") },
  { title: "Netflix Subscription", amount: 45, date: new Date("2024-08-17") },
  { title: "Internet", amount: 60, date: new Date("2024-09-21") },
  { title: "Clothing", amount: 190, date: new Date("2024-10-05") },
  { title: "Christmas Gifts", amount: 300, date: new Date("2024-12-14") },
  { title: "House Rent", amount: 1800, date: new Date("2024-11-01") },

  // 2023
  { title: "Fuel", amount: 100, date: new Date("2023-01-10") },
  { title: "Groceries", amount: 95, date: new Date("2023-02-03") },
  { title: "Mobile Plan", amount: 60, date: new Date("2023-03-15") },
  { title: "Birthday Party", amount: 400, date: new Date("2023-04-09") },
  { title: "Health Insurance", amount: 500, date: new Date("2023-05-20") },
  { title: "Car Loan Payment", amount: 600, date: new Date("2023-06-18") },
  { title: "Dining Out", amount: 130, date: new Date("2023-07-05") },
  { title: "Vacation Tickets", amount: 1200, date: new Date("2023-08-22") },
  { title: "Gadget Purchase", amount: 850, date: new Date("2023-09-17") },
  { title: "Groceries", amount: 105, date: new Date("2023-10-07") },
  { title: "Electricity Bill", amount: 80, date: new Date("2023-11-11") },
  { title: "New Year Party", amount: 450, date: new Date("2023-12-29") },

  // 2022
  { title: "Groceries", amount: 80, date: new Date("2022-01-05") },
  { title: "Fuel", amount: 120, date: new Date("2022-02-12") },
  { title: "Vacation Cruise", amount: 1500, date: new Date("2022-03-23") },
  { title: "Dining Out", amount: 110, date: new Date("2022-04-07") },
  { title: "Clothing", amount: 220, date: new Date("2022-05-16") },
  { title: "Laptop Repair", amount: 300, date: new Date("2022-06-09") },
  { title: "Movie Tickets", amount: 40, date: new Date("2022-07-03") },
  { title: "Car Insurance", amount: 390, date: new Date("2022-08-25") },
  { title: "Fuel", amount: 130, date: new Date("2022-09-15") },
  { title: "Electricity Bill", amount: 95, date: new Date("2022-10-06") },
  { title: "Christmas Gifts", amount: 280, date: new Date("2022-12-22") },
  { title: "Phone Bill", amount: 70, date: new Date("2022-11-02") },
];

// ==========================
//  MONTHLY BAR CHART (CUSTOM)
// ==========================
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const monthBarsContainer = $("#month-bars");

monthNames.forEach(month => {
  const bar = `
    <div class="col-3 col-sm-2 col-md-1 d-flex flex-column align-items-center mb-3">
      <div class="month-bar">
        <div class="month-fill" style="height: 0%;"></div>
      </div>
      <div class="month-label">${month}</div>
    </div>`;
  monthBarsContainer.append(bar);
});

// ==========================
//  UPDATE MONTHLY BAR HEIGHTS
// ==========================
function updateMonthBars(selectedYear) {
  const monthlyTotals = new Array(12).fill(0);
  expenses.forEach(exp => {
    if (exp.date.getFullYear() === selectedYear)
      monthlyTotals[exp.date.getMonth()] += exp.amount;
  });

  const maxValue = Math.max(...monthlyTotals, 1);
  $(".month-fill").each(function (i) {
    const percent = (monthlyTotals[i] / maxValue) * 100;
    $(this).css("height", percent + "%");
  });

  const total = monthlyTotals.reduce((a, b) => a + b, 0);
  $("#total-expense-display").text(`Total Expense for ${selectedYear}: $${total.toFixed(2)}`);
}

// ==========================
//  DISPLAY EXPENSE LIST
// ==========================
function displayExpenses(selectedYear) {
  const listContainer = $("#expenses-list");
  listContainer.empty();

  const filtered = expenses.filter(exp => exp.date.getFullYear() === selectedYear);

  if (filtered.length === 0) {
    listContainer.html('<p class="fw-bold text-center">Found no expenses.</p>');
    return;
  }

  filtered.sort((a, b) => a.date - b.date);

  filtered.forEach(exp => {
    const month = exp.date.toLocaleString("default", { month: "long" });
    const day = exp.date.getDate();
    const year = exp.date.getFullYear();

    const item = `
      <div class="expense-item" data-index="${expenses.indexOf(exp)}">
        <div class="expense-date">
          <div>${month}</div>
          <div>${year}</div>
          <div class="fw-bold">${day}</div>
        </div>
        <div class="expense-title">${exp.title}</div>
        <div class="expense-amount">$${exp.amount.toFixed(2)}</div>
        <button class="delete-btn btn btn-sm btn-danger">✕</button>
      </div>`;
    listContainer.append(item);
  });
}

// ==========================
//  POPUP NOTIFICATION
// ==========================
function showPopup(message, type = "success") {
  const popup = $(`<div class="popup-notification ${type}">${message}</div>`);
  $("body").append(popup);
  setTimeout(() => popup.addClass("show"), 100);
  setTimeout(() => {
    popup.removeClass("show");
    setTimeout(() => popup.remove(), 300);
  }, 2500);
}

// ==========================
//  CUSTOM CONFIRMATION POPUP
// ==========================
function showConfirm(message, onConfirm) {
  const modal = $(`
    <div class="custom-confirm-overlay">
      <div class="custom-confirm-box">
        <p>${message}</p>
        <div class="confirm-buttons">
          <button id="confirm-yes" class="btn btn-sm btn-danger me-2">Yes</button>
          <button id="confirm-no" class="btn btn-sm btn-secondary">No</button>
        </div>
      </div>
    </div>
  `);

  $("body").append(modal);

  $("#confirm-yes").click(() => {
    onConfirm();
    modal.fadeOut(200, () => modal.remove());
  });

  $("#confirm-no").click(() => modal.fadeOut(200, () => modal.remove()));
}

// ==========================
// DELETE EXPENSE HANDLER
// ==========================
$(document).on("click", ".delete-btn", function (e) {
  e.stopPropagation();
  const index = $(this).closest(".expense-item").data("index");

  showConfirm("Are you sure you want to delete this expense?", function () {
    expenses.splice(index, 1);
    updateMonthBars(currentYear);
    displayExpenses(currentYear);
    showPopup("Expense deleted successfully.", "delete");
  });
});

// ==========================
//  INITIAL RENDER
// ==========================
let currentYear = parseInt($("#year-filter").val());
updateMonthBars(currentYear);
displayExpenses(currentYear);

// ==========================
//  YEAR CHANGE HANDLER
// ==========================
$("#year-filter").change(function () {
  currentYear = parseInt($(this).val());
  updateMonthBars(currentYear);
  displayExpenses(currentYear);
});

// ==========================
//  FORM HANDLING
// ==========================
$("#show-form-btn").click(function () {
  $(this).fadeOut(200, function () {
    $("#expense-form").fadeIn(300);
  });
});

$("#cancel-btn").click(function () {
  $("#expense-form").fadeOut(200, function () {
    $("#show-form-btn").fadeIn(300);
  });
});

$("#expense-form").submit(function (e) {
  e.preventDefault();

  const title = $("#title").val().trim();
  const amount = parseFloat($("#amount").val());
  const date = $("#date").val();

  if (!title || !amount || !date) {
    showPopup("Please fill in all fields!", "delete");
    return;
  }

  const newExpense = { title, amount, date: new Date(date) };
  expenses.push(newExpense);

  showPopup(`Added: ${title} — RM${amount} on ${date}`, "success");
  updateMonthBars(currentYear);
  displayExpenses(currentYear);

  this.reset();
  $("#expense-form").fadeOut(200, function () {
    $("#show-form-btn").fadeIn(300);
  });
});
