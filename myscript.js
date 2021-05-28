let currentPage = 0;
let numberPerPage = 5;
let pageCount = 0;

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
      return submitEdit(editSubmit);
    });
    editForm.appendChild(editSubmit);
    let editCancel = document.createElement("button");
    editCancel.className = "cancelEdit";
    let editCancelText = document.createTextNode("Cancel");
    editCancel.appendChild(editCancelText);
    editCancel.addEventListener("click", () => {
      return cancelEdit(editCancel);
    });
    editForm.appendChild(editCancel);
    li.appendChild(editForm);
    //Ouput Lis in Task List
    if (liTitle.textContent !== "") {
      taskList.appendChild(li);
    }

    editBtn.addEventListener("click", () => {
      return editTask(editBtn);
    });
    //Clear Input
    addInput.value = "";
    //Show check all
    let checkAll = document.getElementById("checkAll");
    checkAll.style.display = "block";

    //On one unchecked
    onOneUnchecked();

    //pagination
    calculateButtonsAmount(li);
    generateBtns(li);
    displayItems(li);
  }
};

//Submit Add Task on enter
let inputAdd = document.getElementById("addInput");

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
  //Make CHeck all/uncheck all after delete button is clicked
  // checkAllBoxes();
  //If all unchecked hide deleteAllchecked
  allUnchecked();
  //If all checked
  checkAllBoxesOnDeleteTask();
  //pagination on delete click
  // calculateButtonsAmount();

  deleteBtns(item);
  displayItemsOnDeleteTodo();
  moveItemToPreviousScreen(item);
};

const editTask = (editBtn) => {
  //Display Hidden Edit Form
  editBtn.nextSibling.style.display = "flex";
  editBtn.nextSibling.childNodes[0].value =
    editBtn.parentNode.childNodes[1].textContent;
  //Hide Li
  editBtn.parentNode.childNodes[0].style.display = "none";
  editBtn.style.display = "none";
  editBtn.parentNode.childNodes[1].style.display = "none";
  editBtn.parentNode.childNodes[2].style.display = "none";
  editBtn.parentNode.style.marginLeft = "-70px";
};

const cancelEdit = (editCancel) => {
  //Cancel click
  //Hide Edit Form
  editCancel.parentNode.style.display = "none";
  //Show Li
  editCancel.parentNode.parentNode.childNodes[0].style.display = "block";
  editCancel.parentNode.parentNode.childNodes[1].style = "block";
  editCancel.parentNode.parentNode.childNodes[2].style.display = "flex";
  editCancel.parentNode.previousSibling.style.display = "block";
  editCancel.parentNode.previousSibling.parentNode.style.marginLeft = "0px";
};

const submitEdit = (editSubmit) => {
  //Submit Click
  if (editSubmit.parentNode.childNodes[0].value === "") {
    alert("You should write something");
  } else {
    editSubmit.parentNode.previousSibling.previousSibling.previousSibling.style.display =
      "block";
    editSubmit.parentNode.previousSibling.previousSibling.previousSibling.textContent =
      editSubmit.previousSibling.value;
    //Show Li
    editSubmit.parentNode.parentNode.childNodes[0].style.display = "block";
    editSubmit.parentNode.parentNode.childNodes[2].style.display = "flex";
    editSubmit.parentNode.previousSibling.style.display = "block";

    editSubmit.parentNode.previousSibling.parentNode.style.marginLeft = "0px";
    //Hide Edit Form
    editSubmit.parentNode.style.display = "none";
  }
};

//Delete All Checked
const deleteAllChecked = () => {
  let checkboxes = document.querySelectorAll(".checkbox");
  let incrementer3;
  let checkAll = document.getElementById("checkAll");
  let delCheckedAll = document.getElementById("delCheckedAll");
  delCheckedAll.style.display = "none";
  for (incrementer3 = 0; incrementer3 < checkboxes.length; incrementer3++) {
    if (checkboxes[incrementer3].checked) {
      checkboxes[incrementer3].parentNode.remove();
      checkAll.textContent = "Check All";
      //Hide checked all if needed
      hideCheckedAll();
    }
  }
};

// Show bottom bottom buttons if checked
const showBtns = (checkbox) => {
  let checkAll = document.getElementById("checkAll");
  let delCheckedAll = document.getElementById("delCheckedAll");
  const allChecked = (item) => item.checked;
  const allUnChecked = (item2) => item2.checked === false;
  const oneChecked = (item3) => item3.checked;
  const oneUnchecked = (item4) => item4.checked === false;
  let checkboxes = document.querySelectorAll(".checkbox");
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call(checkboxes, 0);
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
  const oneUnchecked = (item4) => item4.checked === false;
  let checkboxes = document.querySelectorAll(".checkbox");
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call(checkboxes, 0);
  if (arrCheckboxes.some(oneUnchecked)) {
    checkAll.textContent = "Check All";
  }
};

//if all unchecked
const allUnchecked = () => {
  let checkboxes = document.querySelectorAll(".checkbox");
  let arrCheckboxes = Array.prototype.slice.call(checkboxes);
  let delCheckedAll = document.getElementById("delCheckedAll");
  const checkIfAllUnChecked = arrCheckboxes.every((el) => el.checked === false);
  if (checkIfAllUnChecked === true) {
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
  const oneChecked = arrCheckboxes.some((el) => el.checked);
  return arrCheckboxes.map((el) => {
    if (checkIfAllChecked === false) {
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
    if (checkIfAllChecked === false) {
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

// step 1: function which calculates page count
const calculateButtonsAmount = (item) => {
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);
  let delta = Math.ceil(arrLis.length % numberPerPage);
  let screens = document.getElementById("screens");
  if (currentPage === 0) {
    if (
      delta === 1
      // &&
      // typeof screens.children[currentPage + 1] === "undefined"
    ) {
      pageCount++;
      currentPage++;
    }
  } else if (currentPage > 0) {
    if (
      delta === 1
      // && typeof screens.children[currentPage] === "undefined"
    ) {
      pageCount++;
      currentPage++;
    }
  }
  console.log(currentPage, pageCount);
};

//step 2 generate buttons ~~ on pagination button click
const onPageClick = (item) => {
  let uls = document.getElementsByTagName("UL");
  let arrUls = Array.prototype.slice.call(uls);
  let screens = document.getElementById("screens");
  arrUls.forEach((sibling) => {
    sibling.style.display = "none";
  });
  currentPage = parseInt(item.textContent);
  screens.children[currentPage - 1].style.display = "block";
};

const generateBtns = (item) => {
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);
  let paginationBtnsDiv = document.querySelector(".paginationBtnsDiv");
  paginationBtnsDiv.innerHTML = "";
  for (let num = 1; num <= pageCount; num++) {
    let button = document.createElement("button");
    button.textContent = num;
    button.className = "pages";
    button.addEventListener("click", () => onPageClick(button));
    paginationBtnsDiv.appendChild(button);
  }
};

const deleteBtns = (item) => {
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);
  let screens = document.getElementById("screens");
  let pageBtns = document.querySelectorAll(".pages");
  if (arrLis.length % numberPerPage === 0 && arrLis.length > 0) {
    currentPage--;
    pageCount--;
    pageBtns[pageCount].style.display = "none";
  } else if (arrLis.length === 0) {
    pageBtns[0].style.display = "none";
    currentPage = 0;
    pageCount = 0;
  }
};
// step 3: function which displays items
const displayItems = (item) => {
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);
  if (arrLis.length % numberPerPage === 1 && arrLis.length > 5) {
    let screens = document.getElementById("screens");
    let nextScreen = document.createElement("ul");
    screens.appendChild(nextScreen);
    screens.lastElementChild.style.display = "block";
    screens.lastElementChild.appendChild(item);
    screens.children[currentPage - 2].style.display = "none";
  } else if (arrLis.length % numberPerPage !== 1 && arrLis.length > 5) {
    screens.lastElementChild.appendChild(item);
    screens.lastChild.style.display = "block";
    if (typeof screens.children[currentPage] !== "undefined") {
      currentPage++;
    }
    screens.children[currentPage - 2].style.display = "none";
  }
};

const displayItemsOnDeleteTodo = () => {
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);
  let screens = document.getElementById("screens");
  if (
    arrLis.length > 0 &&
    arrLis.length % numberPerPage === 0 &&
    typeof screens.children[pageCount] !== "undefined"
  ) {
    screens.lastChild.remove();
    if (typeof screens.children[currentPage - 1] !== "undefined") {
      screens.children[currentPage - 1].style.display = "block";
    }
  }
};

const moveItemToPreviousScreen = (item) => {
  let lis = document.getElementsByTagName("LI");
  let arrLis = Array.prototype.slice.call(lis);
  let screens = document.getElementById("screens");
  let pageBtns = document.querySelectorAll(".pages");
  if (typeof screens.children[currentPage] !== "undefined") {
    alert(1);
    currentPage++;
    screens.children[currentPage - 2].appendChild(
      screens.children[currentPage - 1].firstChild
    );
  }
};
