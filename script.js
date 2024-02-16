// переменная, чтобы положить / получить из localStorage
const localStorageKey = "timetableData";
// начальные значения
document.addEventListener("DOMContentLoaded", function () {
let tableData = JSON.parse(localStorage.getItem("tableData")) || [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
];

// проверяем, есть ли данные в localStorage.
if (!localStorage.getItem(localStorageKey)) {
  // Если нет, то кладём в localStorage initialArticles
  localStorage.setItem(localStorageKey, tableData);
}

// переделываем в объект
const timetableData = JSON.parse(localStorage.getItem(localStorageKey));
const listTableEl = document.querySelector(".timetable");
// const btnAddedArticleEl = document.querySelector(".btnAdd");

function renderTable() {
  listTableEl.innerHTML = "";
  listTableEl.innerHTML = `
        <td>Занятие</td>
        <td>Время</td>
        <td>Всего мест</td>
        <td>Занято мест</td>
    `;

  tableData.forEach((item) => {
    const rowEl = document.createElement("tr");
    rowEl.innerHTML = `
        <td>${item.name}</td>
        <td>${item.time}</td>
        <td>${item.maxParticipants}</td>
        <td>${item.currentParticipants}</td>
        <td>
        <button data-id="${item.id}" class="join-btn">Записаться</button>
        <button data-id="${item.id}" class="cancel-btn">Отменить</button>
        </td>
    `;

    const joinBtn = rowEl.querySelector(".join-btn");
    const cancelBtn = rowEl.querySelector(".cancel-btn");

    if (item.currentParticipants >= item.maxParticipants ||
      isUserJoined(item.id)) {
        joinBtn.disabled = true;
    } else {
      cancelBtn.disabled = true;
    }

    listTableEl.appendChild(rowEl);
  });
}

function isUserJoined(id) {
    const userTable = JSON.parse(localStorage.getItem("userTable")) || [];
    return userTable.includes(id);
}

listTableEl.addEventListener("click", function ({target}) {
    if (target.classList.contains("join-btn")) {
        const id = parseInt(target.getAttribute("data-id"));
        const selectedItem = tableData.find((item) => item.id === id);
        if (selectedItem.currentParticipants < selectedItem.maxParticipants) {
            selectedItem.currentParticipants++;
            const userTable = JSON.parse(localStorage.getItem("userTable")) || [];
            userTable.push(id);
            localStorage.setItem("userTable", JSON.stringify(userTable));
            localStorage.setItem("tableData", JSON.stringify(tableData));
            renderTable();
        }
    }
});

listTableEl.addEventListener("click", function ({target}) {
    if (target.classList.contains("cancel-btn")) {
        const id = parseInt(target.getAttribute("data-id"));
        const selectItem = tableData.find((item) => item.id === id);
        if (isUserJoined(id)) {
            selectItem.currentParticipants--;
            const userTable = JSON.parse(localStorage.getItem("userTable")) || [];
            const index = userTable.indexOf(id);
            if (index !== -1) {
                userTable.splice(index, 1);
            }
            localStorage.setItem("userTable", JSON.stringify(userTable));
            localStorage.setItem("tableData", JSON.stringify(tableData));
            renderTable();
        }
    }
});

renderTable();
})
