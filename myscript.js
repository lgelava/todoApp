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
    let liTitle = document.createElement('p');
    liTitle.textContent = addInput.value;
    li.appendChild(liTitle);
    let deleteBtn = document.createElement('button');
    deleteBtn.className='close';
    let deleteBtnText = document.createTextNode('Delete');
    deleteBtn.appendChild(deleteBtnText);
   
    deleteBtn.addEventListener('click',()=>{
     return deleteTask(li)
    })

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
    taskList.appendChild(li);
    editBtn.addEventListener('click', ()=>{
      return editTask(editBtn);
    })
    //Clear Input
    addInput.value="";
  }

  const deleteTask = (item) => {
    item.parentNode.removeChild(item);
  }

  const editTask = (editBtn) => {
      //Display Hidden Edit Form
      editBtn.nextSibling.style.display="flex";       
      editBtn.nextSibling.childNodes[0].value = editBtn.parentNode.childNodes[1].textContent;
      //Hide Li
      editBtn.parentNode.childNodes[0].style.display="none";
      editBtn.style.display="none";
      editBtn.parentNode.childNodes[1].textContent = '';
      editBtn.parentNode.childNodes[2].style.display="none"; 
      editBtn.parentNode.style.marginLeft="-70px";
     
  }
  
  const cancelEdit = (editCancel) => {
    //Cancel click
      //Hide Edit Form
      editCancel.parentNode.style.display="none";
       //Show Li
       editCancel.parentNode.parentNode.childNodes[0].style.display="block";
       editCancel.parentNode.parentNode.childNodes[1].textContent = editCancel.parentNode.childNodes[0].value;
       editCancel.parentNode.parentNode.childNodes[2].style.display="flex";
       editCancel.parentNode.previousSibling.style.display="block";
       editCancel.parentNode.previousSibling.parentNode.style.marginLeft="0px";
      //Clear Input
      editCancel.previousSibling.previousSibling.value='';
      
  }

  const submitEdit = (editSubmit) => {
      //Submit Click
      editSubmit.parentNode.previousSibling.previousSibling.previousSibling.textContent = editSubmit.previousSibling.value; 
      //Show Li
      editSubmit.parentNode.parentNode.childNodes[0].style.display="block";
      editSubmit.parentNode.parentNode.childNodes[2].style.display="flex";
      editSubmit.parentNode.previousSibling.style.display="block";

      editSubmit.parentNode.previousSibling.parentNode.style.marginLeft="0px";
      //Hide Edit Form
      editSubmit.parentNode.style.display="none";
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
  



