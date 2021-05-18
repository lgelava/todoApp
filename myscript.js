// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className="checkbox"
    myNodelist[i].appendChild(checkbox);

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);

  var editForm = document.createElement('form');
  editForm.className="editForm";
  var editInput = document.createElement('input');
  editInput.className="editInput";
  editForm.appendChild(editInput); 
  myNodelist[i].appendChild(editForm);
  var editBtn = document.createElement('button');
  var editText = document.createTextNode('edit');
  editBtn.appendChild(editText);
  editBtn.className="edit";
  editBtn.onclick=onEditBtnClick();
  myNodelist[i].appendChild(editBtn);
 
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.remove();
  }
}



// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  li.className="taskItem";
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className="checkbox";
    myNodelist[i].appendChild(checkbox);
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  
 
 
  var editForm = document.createElement('form');
  editForm.className="editForm";
  var editInput = document.createElement('input');
  editInput.className="editInput";
  editForm.appendChild(editInput); 
  myNodelist[i].appendChild(editForm);
  var editBtn = document.createElement('button');
  editBtn.className="edit";
  editBtn.onclick=onEditClickButton();
  var editText = document.createTextNode('edit');
  editBtn.appendChild(editText);
  myNodelist[i].appendChild(editBtn);
  

  
  

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

//Edit
var edit = document.getElementsByClassName("edit");



//Check all
let checkAll = document.getElementById('checkAll');
checkAll.addEventListener('click', onCheckAll);

function onCheckAll(){
    let checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(element => {
        element.checked = true;
    });
}


//Uncheck All
let unCheckAll = document.getElementById('unCheckAll');
unCheckAll.addEventListener('click', onUnCheckAll);

function onUnCheckAll(){
    let checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(elem => {
        elem.checked = false;
    });
}

//Delete All Checked
let delCheckedAll = document.getElementById('delCheckedAll');
delCheckedAll.addEventListener('click', onDelAllClick);

function onDelAllClick(){
    let taskItem = document.querySelector('.taskItem');
    let checkbox = document.querySelectorAll('.checkbox');
    
    
    
        
    };
