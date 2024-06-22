const array = JSON.parse(localStorage.getItem("data") || "[]");

document.addEventListener("DOMContentLoaded", () => {
  // Function to fetch and create options
  function fetchAndCreateOptions() {
    fetch("employee.json")
      .then((response) => response.json())
      .then((data) => {
        createOptions(data);
      });
  }

  // Function to create options
  function createOptions(data) {
    const select = document.getElementById("dynamicSelect");
    data.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.textContent = option.first_name + " " + option.last_name;
      select.appendChild(optionElement);
    });
  }

  // Fetch and create options
  fetchAndCreateOptions();
});

let btntask = document.getElementById("btntask");

function handelSaveevent() {
  const taskInput = document.getElementById("taskInput");
  const dynamicSelect = document.getElementById("dynamicSelect");
  const startDate = document.getElementById("startDate");
  const endtDate = document.getElementById("endtDate");
  const selectLeaves = document.getElementById("selectLeaves");

  if (taskInput.value === "" || endtDate.value === "") {
    return alert("Please enter information");
  }

  const idInput = document.getElementById("taskId").value;
  if (idInput) {
    // Update existing task
    const taskIndex = array.findIndex((task) => task.id === parseInt(idInput));
    if (taskIndex >= 0) {
      array[taskIndex].fullName = dynamicSelect.value;
      array[taskIndex].task = taskInput.value;
      array[taskIndex].Priority = selectLeaves.value;
      array[taskIndex].hire_date = endtDate.value;
      array[taskIndex].startDae = startDate.value;
    }
  } else {
    // Add new task
    array.push({
      id: array[array.length - 1]?.id + 1 || 1,
      fullName: dynamicSelect.value,
      task: taskInput.value,
      Priority: selectLeaves.value,
      hire_date: endtDate.value,
      startDae: startDate.value,
      status: ""
    });
  }
  localStorage.setItem("data", JSON.stringify(array));
  buildTable(array);

  // Clear input fields
  taskInput.value = "";
  dynamicSelect.value = "";
  startDate.value = "";
  endtDate.value = "";
  selectLeaves.value = "";
  document.getElementById("taskId").value = "";
}

btntask.addEventListener("click", handelSaveevent);

function buildTable(data) {
  let table = document.getElementById("tasks_tbody");
  table.innerHTML = ""; // Clear existing table content

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");

    const cell1 = document.createElement("td");
    cell1.textContent = data[i].id;
    row.appendChild(cell1);

    const cell2 = document.createElement("td");
    cell2.textContent = data[i].fullName;
    row.appendChild(cell2);

    const cell3 = document.createElement("td");
    cell3.textContent = data[i].task;
    cell3.style.maxWidth = "150px";
    row.appendChild(cell3);

    const cell4 = document.createElement("td");
    cell4.textContent = data[i].Priority;
    row.appendChild(cell4);
    if (data[i].Priority == "High priority") {
      cell4.style.color = "red";
    } else if (data[i].Priority == "Middle priority") {
      cell4.style.color = "rgb(132, 161, 0)";
    } else {
      cell4.style.color = "green";
    }

    const cell5 = document.createElement("td");
    cell5.textContent = data[i].hire_date;
    row.appendChild(cell5);

    const cell6 = document.createElement("td");

    // Create the Done link
    const doneLink = document.createElement("a");
    doneLink.href = "#!";
    doneLink.setAttribute("data-mdb-tooltip-init", "");
    doneLink.setAttribute("data-testid", data[i].id);

    doneLink.title = "Done";

    const doneIcon = document.createElement("i");
    doneIcon.className = "fas fa-check fa-lg text-success me-3";
    doneLink.appendChild(doneIcon);

    doneLink.addEventListener("click", () => {
      const dataTestId = doneLink.getAttribute("data-testid");
      handleDoneButtonClick(dataTestId);
      location.reload();
    });

    cell6.appendChild(doneLink);

    // Display the status of the task
    const cell7 = document.createElement("td");
    cell7.textContent = data[i].status;
    cell7.style.color = "green";

    row.appendChild(cell7);

    // Create the Edit link
    const editLink = document.createElement("a");
    editLink.href = "#!";
    editLink.setAttribute("data-mdb-tooltip-init", "");
    editLink.setAttribute("data-testid", data[i].id);
    editLink.title = "Edit";

    const editIcon = document.createElement("i");
    editIcon.className = "fas fa-edit fa-lg text-primary me-3";
    editLink.appendChild(editIcon);

    editLink.addEventListener("click", () => {
      const dataTestId = editLink.getAttribute("data-testid");
      handleEditButtonClick(dataTestId);
    });

    cell6.appendChild(editLink);

    // Create the Remove link
    const removeLink = document.createElement("a");
    removeLink.id = "remove";
    removeLink.setAttribute("data-testid", data[i].id);
    removeLink.href = "#!";
    removeLink.setAttribute("data-mdb-tooltip-init", "");
    removeLink.title = "Remove";

    const removeIcon = document.createElement("i");
    removeIcon.className = "fas fa-trash-alt fa-lg text-warning";
    removeLink.appendChild(removeIcon);

    removeLink.addEventListener("click", () => {
      const dataTestId = removeLink.getAttribute("data-testid");
      handleDeleteButtonClick(dataTestId);
      location.reload();
    });

    cell6.appendChild(removeLink);

    row.appendChild(cell6);
    table.appendChild(row);
  }
}

function handleDeleteButtonClick(id) {
  const filteredData = array.filter((obj) => obj.id !== parseInt(id));
  localStorage.setItem("data", JSON.stringify(filteredData));
  buildTable(filteredData);
}

function handleDoneButtonClick(id) {
  let objToUpdate = array.find((obj) => obj.id === parseInt(id));

  if (objToUpdate) {
    objToUpdate.status = objToUpdate.status === "Done" ? "" : "Done";
  }
  localStorage.setItem("data", JSON.stringify(array));
  buildTable(array);
}

function handleEditButtonClick(id) {
  let objToEdit = array.find((obj) => obj.id === parseInt(id));

  if (objToEdit) {
    document.getElementById("taskId").value = objToEdit.id;
    document.getElementById("dynamicSelect").value = objToEdit.fullName;
    document.getElementById("taskInput").value = objToEdit.task;
    document.getElementById("selectLeaves").value = objToEdit.Priority;
    document.getElementById("startDate").value = objToEdit.startDae;
    document.getElementById("endtDate").value = objToEdit.hire_date;
  }
}

// Add a hidden input field in your HTML to store the task ID for editing
const hiddenInput = document.createElement("input");
hiddenInput.type = "hidden";
hiddenInput.id = "taskId";
document.body.appendChild(hiddenInput);

buildTable(array);
