    const addTask = () => {
    //Create Full LI
    let taskList = document.getElementById('myUL');
    let li = document.createElement('li');
    li.className="listItem";
    let checkbox = document.createElement('input');
    checkbox.className="checkbox";
    checkbox.type="checkbox";
    checkbox.addEventListener('change', () =>{
      return showBtns(checkbox);
    })
    li.appendChild(checkbox);
    let addInput = document.querySelector('#addInput');
    let liTitle = document.createElement('p');
    liTitle.textContent = addInput.value;
    li.appendChild(liTitle);
    let deleteBtn = document.createElement('button');
    deleteBtn.className='close';
    let deleteBtnText = document.createTextNode('Delete');
    deleteBtn.appendChild(deleteBtnText);
   
    deleteBtn.addEventListener('click',()=>{
     return deleteTask(li);
    });

    li.appendChild(deleteBtn);
    let editBtn = document.createElement('button');
    editBtn.className='edit';
    let editBtnText = document.createTextNode('Edit');
    editBtn.appendChild(editBtnText);
    li.appendChild(editBtn);
    let editForm = document.createElement('div');
    editForm.className = 'editForm';
    let editInput = document.createElement('input');
    editInput.className = 'editInput';
    editForm.appendChild(editInput);
    let editSubmit = document.createElement('button');
    editSubmit.className='submitEdit';
    let editSubmitText = document.createTextNode('Submit');
    editSubmit.appendChild(editSubmitText);
    editSubmit.addEventListener('click', () => {
      return submitEdit(editSubmit);
    })
    editForm.appendChild(editSubmit);
    let editCancel = document.createElement('button');
    editCancel.className="cancelEdit";
    let editCancelText = document.createTextNode('Cancel');
    editCancel.appendChild(editCancelText);
    editCancel.addEventListener('click', () => {
      return cancelEdit(editCancel);
    })
    editForm.appendChild(editCancel);
    li.appendChild(editForm);
    //Ouput Lis in Task List
    if (liTitle.textContent===''){
      alert('You should write something')
    }else{
      taskList.appendChild(li);
    }
   
    editBtn.addEventListener('click', ()=>{
      return editTask(editBtn);
    })
    //Clear Input
    addInput.value="";
    //Show check all
    let checkAll = document.getElementById('checkAll');
    checkAll.style.display="block";

    //On one unchecked
    onOneUnchecked();
  
  }
  
  //Submit Add Task on enter
  let inputAdd = document.getElementById('addInput');
  inputAdd.addEventListener('keyup', (e) => {
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
    checkAllBoxes2();
    //If all unchecked hide deleteAllchecked
    allUnchecked();
  }

  const editTask = (editBtn) => {
      //Display Hidden Edit Form
      editBtn.nextSibling.style.display="flex";       
      editBtn.nextSibling.childNodes[0].value = editBtn.parentNode.childNodes[1].textContent;
      //Hide Li
      editBtn.parentNode.childNodes[0].style.display="none";
      editBtn.style.display="none";
      editBtn.parentNode.childNodes[1].style.display="none";
      editBtn.parentNode.childNodes[2].style.display="none"; 
      editBtn.parentNode.style.marginLeft="-70px";
     
  }
  
  const cancelEdit = (editCancel) => {
    //Cancel click
      //Hide Edit Form
      editCancel.parentNode.style.display="none";
       //Show Li
       editCancel.parentNode.parentNode.childNodes[0].style.display="block";
       editCancel.parentNode.parentNode.childNodes[1].style="block";
       editCancel.parentNode.parentNode.childNodes[2].style.display="flex";
       editCancel.parentNode.previousSibling.style.display="block";
       editCancel.parentNode.previousSibling.parentNode.style.marginLeft="0px"; 
  }

  const submitEdit = (editSubmit) => {
      //Submit Click
      editSubmit.parentNode.previousSibling.previousSibling.previousSibling.style.display="block";
      editSubmit.parentNode.previousSibling.previousSibling.previousSibling.textContent = editSubmit.previousSibling.value; 
      //Show Li
      editSubmit.parentNode.parentNode.childNodes[0].style.display="block";
      editSubmit.parentNode.parentNode.childNodes[2].style.display="flex";
      editSubmit.parentNode.previousSibling.style.display="block";

      editSubmit.parentNode.previousSibling.parentNode.style.marginLeft="0px";
      //Hide Edit Form
      editSubmit.parentNode.style.display="none";
      }        
    
 

 //Delete All Checked
 const deleteAllChecked = () => {
  let checkboxes = document.querySelectorAll('.checkbox');
  let incrementer3;
  let checkAll = document.getElementById('checkAll');
  let delCheckedAll = document.getElementById('delCheckedAll');
  delCheckedAll.style.display="none";
  for(incrementer3 = 0; incrementer3<checkboxes.length; incrementer3++){
    if(checkboxes[incrementer3].checked){
    checkboxes[incrementer3].parentNode.remove();
    checkAll.textContent="Check All";
    //Hide checked all if needed
    hideCheckedAll();
  }
 }
 }


// Show bottom bottom buttons if checked
const showBtns = (checkbox) => {
  
  let checkAll = document.getElementById('checkAll');
  let delCheckedAll = document.getElementById('delCheckedAll');
  const allChecked = (item) => item.checked;
  const allUnChecked = (item2) => item2.checked===false;
  const oneChecked = (item3) => item3.checked;
  const oneUnchecked = (item4) => item4.checked===false;
  let checkboxes = document.querySelectorAll('.checkbox');
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call( checkboxes, 0 );
  onOneUnchecked();
  if((arrCheckboxes).every(allChecked)){
    checkAll.textContent="Uncheck All";
  }
  arrCheckboxes.filter(checkbox =>{
    if(arrCheckboxes.some(oneChecked)){
      delCheckedAll.style.display="block";
      
    }else if (arrCheckboxes.every(allUnChecked)){
      delCheckedAll.style.display="none";
    }
})
}


const onOneUnchecked = () => {
  let checkAll = document.getElementById('checkAll');
  const oneUnchecked = (item4) => item4.checked===false;
  let checkboxes = document.querySelectorAll('.checkbox');
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call( checkboxes, 0 );
  if((arrCheckboxes).some(oneUnchecked)){
    checkAll.textContent="Check All";
  }
}


//if all unchecked
const allUnchecked = () => {
  let checkboxes = document.querySelectorAll('.checkbox');
  let arrCheckboxes = Array.prototype.slice.call( checkboxes );
  let delCheckedAll = document.getElementById('delCheckedAll');
  const checkIfAllUnChecked = arrCheckboxes.every(el => el.checked===false);
  if(checkIfAllUnChecked===true){
    delCheckedAll.style.display="none";
  }
}


//Check all/ uncheck all
const checkAllBoxes = () => {
  let checkboxes = document.querySelectorAll('.checkbox');
  let checkAll = document.getElementById('checkAll');
 
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call( checkboxes );
  
  const checkIfAllChecked = arrCheckboxes.every(el => el.checked);

  return arrCheckboxes.map(el => {
    if(checkIfAllChecked===false){
      el.checked=true;
      checkAll.textContent="Uncheck All";
    }else{
      
      el.checked=false;
      checkAll.textContent="Check All";
    }
  })
}

//Make CHeck all/uncheck all after delete button is clicked
const checkAllBoxes2 = () => {
  let checkboxes = document.querySelectorAll('.checkbox');
  let checkAll = document.getElementById('checkAll');
 
  //checkboxes collection to an array
  let arrCheckboxes = Array.prototype.slice.call( checkboxes );
  
  const checkIfAllChecked = arrCheckboxes.every(el => el.checked);

  return arrCheckboxes.map(el => {
    if(checkIfAllChecked===false){
      
      el.checked=false;
      checkAll.textContent="Check All";
    }else{
      el.checked=true;
      checkAll.textContent="Uncheck All";
    }
  })
}


//hide Check All
const hideCheckedAll = () => {
  let checkAll = document.getElementById('checkAll');
  let lis = document.getElementsByTagName('LI');
  lis.length === 0 ? checkAll.style.display="none" : null  
}

let checkbox = document.createElement('input');
checkbox.className="checkbox";
checkbox.type="checkbox";