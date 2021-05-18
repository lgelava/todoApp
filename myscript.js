  const addTask = () => {
    //Create Full LI
    let taskList = document.getElementById('myUL');
    let li = document.createElement('li');
    li.className="listItem";
    let checkbox = document.createElement('input');
    checkbox.className="checkbox";
    checkbox.type="checkbox";
    li.appendChild(checkbox);
    let addInput = document.querySelector('#addInput');
    let liTitle = addInput.value;
    let liTextNode = document.createTextNode(liTitle);
    li.appendChild(liTextNode);
    let deleteBtn = document.createElement('button');
    deleteBtn.className='close';
    let deleteBtnText = document.createTextNode('Delete');
    deleteBtn.appendChild(deleteBtnText);
    li.appendChild(deleteBtn);
    let editBtn = document.createElement('button');
    editBtn.className='edit';
    let editBtnText = document.createTextNode('Edit');
    editBtn.appendChild(editBtnText);
    li.appendChild(editBtn);
    let editForm = document.createElement('form');
    editForm.className = 'editForm';
    let editInput = document.createElement('input');
    editInput.className = 'editInput';
    editForm.appendChild(editInput);
    let editSubmit = document.createElement('button');
    editSubmit.className='submitEdit';
    let editSubmitText = document.createTextNode('Submit');
    editSubmit.appendChild(editSubmitText);
    editForm.appendChild(editSubmit);
    let editCancel = document.createElement('button');
    editCancel.className="cancelEdit";
    let editCancelText = document.createTextNode('Cancel');
    editCancel.appendChild(editCancelText);
    editForm.appendChild(editCancel);
    li.appendChild(editForm);
    //Ouput Lis in Task List
    taskList.appendChild(li);
    //Clear Input
    addInput.value="";
    //Delete Task
    let close = document.getElementsByClassName("close");
    let index;
    for (index = 0; index < close.length; index++) {
      close[index].onclick = (e) =>{
        //aq vcade am funqciis garet gatana, magram ar imushava
        e.target.parentNode.remove();
      }
  } 
    //edit task
    let editBtns = document.getElementsByClassName("edit");
    let counter;
    for (counter = 0; counter < editBtns.length; counter++) {
      editBtns[counter].onclick = (e) =>{
        //aq vcade am funqciis garet gatana, magram ar imushava
        let editForms=document.querySelectorAll('.editForm')
        //Display Hidden Edit Form
        e.target.nextSibling.style.display="flex";   
      }
  }
      //Cancel click
      let cancelEdit = document.getElementsByClassName("cancelEdit");
      let incrementer;
      for (incrementer = 0; incrementer < editBtns.length; incrementer++) {
        cancelEdit[incrementer].onclick = (e) =>{
        //aq vcade am funqciis garet gatana, magram ar imushava
        e.preventDefault();
        //Hide Edit Form
        e.target.parentNode.style.display="none";
        //Clear Input
        e.target.previousSibling.previousSibling.value='';
      }
  }
      //Submit Click
      let submitEdit = document.getElementsByClassName("submitEdit");
      let incrementer2;
      for (incrementer2 = 0; incrementer2 < editBtns.length; incrementer2++) {
        submitEdit[incrementer2].onclick = (e) =>{
        //aq vcade am funqciis garet gatana, magram ar imushava
        e.preventDefault();
        if(e.target.previousSibling.value !== ''){
        e.target.parentNode.previousSibling.previousSibling.previousSibling.textContent = e.target.previousSibling.value; 
        e.target.parentNode.style.display="none";
        }else{
          alert("You should edit the name");
        }         
      }
  }
}


  //Check All
  const checkAll = () => {
    let checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.checked=true;
      
    });
  }
 
  //Uncheck All
  const unCheckAll = () => {
    let checkboxes = document.querySelectorAll('.checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.checked=false;
      
    });
  }

 //Delete All Checked
 const deleteAllChecked = () => {
  let checkboxes = document.querySelectorAll('.checkbox');
  let incrementer3;
  for(incrementer3 = 0; incrementer3<checkboxes.length; incrementer3++){
    if(checkboxes[incrementer3].checked){
    checkboxes[incrementer3].parentNode.remove();
  }
 }
 }
  



