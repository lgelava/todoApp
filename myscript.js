let taskHolder = document.getElementById("myUL");
let paginationBlock = document.getElementById("paginationBtnsDiv");
let inputAdd = document.getElementById("addInput");
let pageCount = 1;
let currentPage = 1;

const addTask = () => {
  //Create Full LI
  let addInput = document.querySelector("#addInput");
  if (addInput.value !== "") {
    let taskList = document.getElementById("myUL");
    let li = document.createElement("li");
    li.className = "listItem";
    let checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      return showBtns(checkbox);
    });
    li.appendChild(checkbox);

    let liTitle = document.createElement("p");
    liTitle.textContent = addInput.value;
    li.appendChild(liTitle);
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "close";
    let deleteBtnText = document.createTextNode("Delete");
    deleteBtn.appendChild(deleteBtnText);

    deleteBtn.addEventListener("click", () => {
      return deleteTask(li);
    });

    li.appendChild(deleteBtn);
    let editBtn = document.createElement("button");
    editBtn.className = "edit";
    let editBtnText = document.createTextNode("Edit");
    editBtn.appendChild(editBtnText);
    li.appendChild(editBtn);
    let editForm = document.createElement("div");
    editForm.className = "editForm";
    let editInput = document.createElement("input");
    editInput.className = "editInput";

    editForm.appendChild(editInput);
    let editSubmit = document.createElement("button");
    editSubmit.className = "submitEdit";
    let editSubmitText = document.createTextNode("Submit");
    editSubmit.appendChild(editSubmitText);
    editSubmit.addEventListener("click", () => {
      return submitEdit(li);
    });
    editForm.appendChild(editSubmit);
    let editCancel = document.createElement("button");
    editCancel.className = "cancelEdit";
    let editCancelText = document.createTextNode("Cancel");
    editCancel.appendChild(editCancelText);
    editCancel.addEventListener("click", () => {
      return cancelEdit(li);
    });
    editForm.appendChild(editCancel);
    li.appendChild(editForm);
    //Ouput Lis in Task List
    if (liTitle.textContent !== "") {
      taskList.appendChild(li);
      if (liTitle.textContent.length > 15) {
        liTitle.textContent = liTitle.textContent.substring(0, 10) + "...";
      }
    }

    editBtn.addEventListener("click", () => {
      return editTask(li);
    });
    //Clear Input
    addInput.value = "";
    //Show check all
    let checkAll = document.getElementById("checkAll");
    checkAll.style.display = "block";

    //On one unchecked
    onOneUnchecked();
    setPageCount();
    renderPagination();
    //pagination
    let lis = document.getElementsByTagName("LI");
    let arrLis = Array.prototype.slice.call(lis);

    if (arrLis.length % 5 === 1) {
      currentPage = pageCount;
    }

    paginationDisplay();
  }
};

//Submit Add Task on enter
inputAdd.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addTask();
  }
});

const deleteTask = (item) => {
  item.parentNode.removeChild(item);
  //Hide CheckAll if needed
  hideCheckedAll();
  //If all unchecked hide deleteAllchecked
  allUnchecked();
  //If all checked

  checkAllBoxesOnDeleteTask();

  setPageCount();
  renderPagination();
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);

  if (arrLis.length % 5 === 0) {
    if (pageCount - currentPage >= 1) {
    } else {
      currentPage = pageCount;
    }
  }
  paginationDisplay();
};

const editTask = (li) => {
  let editForm = li.querySelector(".editForm");
  editForm.style.display = "flex";
  editForm.children[0].value = li.children[1].textContent;
  //Hide Li Checkbox, Text Content and Delete Btn
  li.children[0].style.display = "none";
  li.children[1].style.display = "none";
  li.children[2].style.display = "none";
  li.children[3].style.display = "none";
  li.style.marginLeft = "-70px";
};

const cancelEdit = (li) => {
  //Cancel click
  //Hide Edit Form
  let editForm = li.querySelector(".editForm");
  editForm.style.display = "none";
  //Show Li
  li.children[0].style.display = "block";
  li.children[1].style.display = "block";
  li.children[2].style.display = "flex";
  li.children[3].style.display = "block";
  li.style.marginLeft = "0px";
};

const submitEdit = (li) => {
  let editForm = li.querySelector(".editForm");
  //Submit Click
  if (editForm.children[0].value === "") {
    alert("You should write something");
  } else {
    li.children[1].textContent = editForm.children[0].value;
    //Show Li
    li.children[0].style.display = "block";
    li.children[1].style.display = "block";
    li.children[2].style.display = "flex";
    li.children[3].style.display = "block";
    editForm.style.display = "none";
    li.style.marginLeft = "0px";
  }
};

//Delete All Checked
const deleteAllChecked = () => {
  let checkboxes = document.querySelectorAll(".checkbox");
  let checkAll = document.getElementById("checkAll");
  let delCheckedAll = document.getElementById("delCheckedAll");
  delCheckedAll.style.display = "none";
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].parentNode.remove();
      checkAll.textContent = "Check All";
      //Hide checked all if needed
      hideCheckedAll();
    }
  }
  setPageCount();
  renderPagination();
  paginationDisplay();
};

// Show bottom bottom buttons if checked

const showBtns = () => {
  let checkAll = document.getElementById("checkAll");
  let delCheckedAll = document.getElementById("delCheckedAll");
  const allChecked = (item) => item.checked;
  const allUnChecked = (box) => !box.checked;
  const oneChecked = (checkbox) => checkbox.checked;
  let checkboxes = document.querySelectorAll(".checkbox");
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call(checkboxes);
  onOneUnchecked();
  if (arrCheckboxes.every(allChecked)) {
    checkAll.textContent = "Uncheck All";
  }

  if (arrCheckboxes.some(oneChecked)) {
    delCheckedAll.style.display = "block";
  } else if (arrCheckboxes.every(allUnChecked)) {
    delCheckedAll.style.display = "none";
  }
};

const onOneUnchecked = () => {
  let checkAll = document.getElementById("checkAll");
  let checkboxes = document.querySelectorAll(".checkbox");
  const oneUnchecked = (checkbox) => !checkbox.checked;
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call(checkboxes);
  if (arrCheckboxes.some(oneUnchecked)) {
    checkAll.textContent = "Check All";
  }
};

//if all unchecked
const allUnchecked = () => {
  let checkboxes = document.querySelectorAll(".checkbox");
  let arrCheckboxes = Array.prototype.slice.call(checkboxes);
  let delCheckedAll = document.getElementById("delCheckedAll");
  const checkIfAllUnChecked = arrCheckboxes.every((el) => !el.checked);
  if (checkIfAllUnChecked) {
    delCheckedAll.style.display = "none";
  }
};

//Check all/ uncheck all
const checkAllBoxes = () => {
  let checkboxes = document.querySelectorAll(".checkbox");
  let checkAll = document.getElementById("checkAll");

  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call(checkboxes);
  const checkIfAllChecked = arrCheckboxes.every((el) => el.checked);
  return arrCheckboxes.map((el) => {
    if (!checkIfAllChecked) {
      el.checked = true;
      checkAll.textContent = "Uncheck All";
      showBtns();
    } else if (checkIfAllChecked) {
      el.checked = false;
      checkAll.textContent = "Check All";
      showBtns();
    }
  });
};

// Make Check all/uncheck all after delete button is clicked
const checkAllBoxesOnDeleteTask = () => {
  let checkboxes = document.querySelectorAll(".checkbox");
  let checkAll = document.getElementById("checkAll");

  let arrCheckboxes = Array.prototype.slice.call(checkboxes);

  const checkIfAllChecked = arrCheckboxes.every((el) => el.checked);

  return arrCheckboxes.map((el) => {
    if (!checkIfAllChecked) {
      el.checked = false;
      checkAll.textContent = "Check All";
    } else {
      el.checked = true;
      checkAll.textContent = "Uncheck All";
    }
  });
};

//hide Check All
const hideCheckedAll = () => {
  let checkAll = document.getElementById("checkAll");
  let lis = document.getElementsByTagName("LI");
  lis.length === 0 ? (checkAll.style.display = "none") : null;
};

//Pagination

const setPageCount = () => {
  const items = [...taskHolder.children];
  pageCount = Math.ceil(items.length / 5);
};

setPageCount();

const renderPagination = () => {
  paginationBlock.innerHTML = "";
  for (let i = 1; i <= pageCount; i++) {
    let pageBtn = document.createElement("button");
    pageBtn.id = "pageBtn";
    pageBtn.className = "pageBtn";
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      paginationDisplay();
    });

    pageBtn.innerText = i;

    paginationBlock.append(pageBtn);
  }
};

const paginationDisplay = () => {
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);

  const items = arrLis;
  const start = (currentPage - 1) * 5;
  const end = start + 5;
  items.forEach((item, index) => {
    if (index >= start && index < end) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};
