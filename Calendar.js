const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Assuming the dataset is already available as "data" in SAC
const data = [
  { "name": "Alice", "birthday": "1990-12-15" },
  { "name": "Bob", "birthday": "1985-12-25" },
  { "name": "Charlie", "birthday": "1992-12-01" }
];

function renderCalendar() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const calendarDays = document.getElementById("calendar-days");
    calendarDays.innerHTML = "";

    // Render empty cells before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarDays.appendChild(emptyCell);
    }

    // Render days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day");
        dayCell.innerText = day;

        // Highlight the days that match a birthday
        const dayString = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const birthday = data.find(event => event.birthday === dayString);

        if (birthday) {
            dayCell.classList.add("birthday-day");
        }

        calendarDays.appendChild(dayCell);
    }

    // Update month/year header
    document.getElementById("month-year").innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentYear}`;
}

function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

// Initial render
renderCalendar();
