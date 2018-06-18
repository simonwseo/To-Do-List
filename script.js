const input = document.getElementById('listItem');
const addList = document.getElementById('addList');
const ul = document.querySelector('ul');
const li = document.getElementsByTagName('li');
const changeInput = document.getElementsByClassName('changeInput');
const checkBox = document.getElementsByClassName('completed');
const deleteItem = document.getElementsByClassName('deleteButton');
const changeItem = document.getElementsByClassName('changeButton');
const cancelItem = document.getElementsByClassName('cancelButton');
const submitItem = document.getElementsByClassName('submitButton');
const displayItems = document.getElementById('displayItems');





const handlers = {
   displayTodos: () => {
      todoList.displayTodos();
    },
    toggleAll: () => {
      todoList.toggleAll();
    },
    addTodo: () =>{
      todoList.addTodo(input.value);
    },
    deleteAll: () =>{
      todoList.deleteAll();
    },
    clearAllChecked: () =>{
      todoList.clearAllChecked();
    }
};


let todoList = {
  todos: [],
  displayTodos: function() {
    if (this.todos.length === 0){
      console.log('The list is empty');
    }else{
      console.log('My Todos:');
      for (let i = 0; i < this.todos.length; i++){

        if (this.todos[i].completed === true){
          console.log(' ( X ) ' + this.todos[i].todoText);
        }else{
          console.log(' (  ) ' + this.todos[i].todoText);
        }
      }
    }
    //hides list
    if (ul.style.display == 'none'){
       displayItems.textContent = 'Hide List';
       ul.style.display = 'block';
    }else{
        displayItems.textContent = 'Show List';
        ul.style.display = 'none';
    }


  },
  addTodo: function(todoText) {

   let compareText = "↠" + todoText;
   let blankSpace = 0;

    //Prevents user from entering invalid todo item
    for(let i = 0; i < todoText.length; i++){
      if (todoText[i] === " "){
        blankSpace++;
      }
    }

    if (blankSpace === todoText.length){
      alert('Please enter at least one character.');
    }else{


    //Create an li element and add the input value as text content

    let listItem = document.createElement('li');
    let container = document.createElement('div');
    let completedItem = document.createElement('input');
    let deleteButton = document.createElement('button');
    let changeButton = document.createElement('button');

    listItem.className = "todoStyle";
    listItem.innerHTML ="<p>" + "↠" + todoText + "</p>";

    completedItem.type = 'checkbox';
    completedItem.className = 'completed';

    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';

    changeButton.innerHTML = '&#9998;'
    changeButton.className = 'changeButton'

    ul.appendChild(listItem);
    listItem.appendChild(container);
    container.appendChild(completedItem);
    container.appendChild(deleteButton);
    container.appendChild(changeButton);


    input.value = "";

    this.todos.push({
      todoText: listItem.firstElementChild.textContent,
      completed: false,
      buttonsCreated: false
    });

//Change Todos

    changeButton.onclick = function (event){

// Disables other edit buttons while editing target todo
      for (let i = 0; i < changeItem.length;i++){
        if(changeItem[i] !== event.target){
          changeItem[i].disabled = true;
        }
      }

      let div = event.target.parentNode;
      let p = div.previousElementSibling;
      let previousText = p.textContent;
      let submitButton = document.createElement ('button');
      let cancelButton = document.createElement('button');
      let listPosition;

      for (let i = 0; i < todoList.todos.length; i++){
        if (event.target === changeItem[i]){
          listPosition = i;
        }
      }

      p.innerHTML = '↠<input type="text" class="changeInput" placeholder=" ' + previousText + '">';

//adding a cancel button
      cancelButton.innerHTML = '&cross;';
      cancelButton.className = 'cancelButton';
      submitButton.innerHTML = '&check;';
      submitButton.className = 'submitButton';

      changeItem[listPosition].style.display = 'none';

      if (todoList.todos[listPosition].buttonsCreated === false){
      div.appendChild(submitButton);
      div.appendChild(cancelButton);

      todoList.todos[listPosition].buttonsCreated = true;
    }else{
      cancelItem[listPosition].style.display ='inline-block';
      submitItem[listPosition].style.display ='inline-block';
    }

//Submit edit button
      submitButton.onclick = function (event){

        let position;

        for (let i = 0; i < submitItem.length; i++){
          if (event.target === submitItem[i]){
            position = i;
          }
        }

        debugger;

        p.textContent = '↠' + changeInput[0].value;

        for (let i = 0; i < changeItem.length;i++){
          if(changeItem[i] !== event.target){
            changeItem[i].disabled = false;
          }
        }

      changeItem[listPosition].style.display = 'inline-block';

      cancelItem[position].style.display = 'none';
      submitItem[position].style.display = 'none';

      }

//Cancel edit button
        cancelButton.onclick = function (event){

          let position;

          for (let i = 0; i < cancelItem.length; i++){
            if (event.target === cancelItem[i]){
              position = i;
            }
          }

          for (let i = 0; i < changeItem.length;i++){
            if(changeItem[i] !== event.target){
              changeItem[i].disabled = false;
            }
          }

          p.textContent = previousText;

        changeItem[listPosition].style.display = 'inline-block';

        cancelItem[position].style.display = 'none';
        submitItem[position].style.display = 'none';

        }

    }

//Deleting Todos
    deleteButton.onclick = function (event){
        let div = event.target.parentNode;
        let todoItem = div.parentNode;
        let position;

      for (let i = 0; i < todoList.todos.length; i++){
        	if (event.target === deleteItem[i]){
            position = i;
          }
        }

        if (confirm ('Are you sure you want to delete this item?')){
        todoList.deleteTodo(position);
        ul.removeChild(todoItem);
      }else{
      }

      }

// adding onclick attribute for the newly created check box item
  completedItem.onclick = function (event){
    for (let i = 0; i < todoList.todos.length; i++){
      if (event.target === checkBox[i]){
        position = i;
      }
    }
    //run function to match data value
    todoList.toggleCompleted(position);

    //add & remove style based on boolean value
    if (todoList.todos[position].completed === true){
    li[position].style.color = 'gray';
    li[position].style.fontStyle = 'italic';
    li[position].style.textDecoration = 'line-through';
  }else{
    li[position].style.color ="black";
    li[position].style.fontStyle = 'normal';
    li[position].style.textDecoration = 'none';
  }
   }
  }
},


  changeTodo: function(targetNum, content) {
  this.todos[targetNum] = content;
  },
  deleteTodo: function(itemNumber){
    this.todos.splice(itemNumber, 1);
  },
  toggleCompleted: function(position){

    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },

  toggleAll: function(){

    let totalTodos = this.todos.length;
    let completedTodos = 0;


    for (let i = 0; i < totalTodos; i++){
      if (this.todos[i].completed === true){
        completedTodos++;
      }
    }

    if (totalTodos === completedTodos){
         for(let i = 0; i < totalTodos; i++){
           this.todos[i].completed = false;
           checkBox[i].checked = false;

           li[i].style.color ="black";
           li[i].style.fontStyle = 'normal';
           li[i].style.textDecoration = 'none';

         }
       }else{
         for(let i = 0; i < this.todos.length; i++){
           this.todos[i].completed = true;
           checkBox[i].checked = true;

           li[i].style.color = 'gray';
           li[i].style.fontStyle = 'italic';
           li[i].style.textDecoration = 'line-through';
       }
     }
   },

//Deletes everything on the list
   deleteAll: function(){
     let todo = this.todos;

     if (confirm ('Are you sure you want to delete everything?')){
       ul.innerHTML = "";
       todo.splice(0,todo.length);
       }else{

       }
    },

//Clears all that are Checked
    clearAllChecked: function(){
      let allClear = 0;

  for (let i = 0; i < checkBox.length; i++){
    if (checkBox[i].checked === true){
      allClear++;
    }
  }

  if (allClear === checkBox.length){
    ul.innerHTML = "";
    this.todos.splice(0,this.todos.length);
  }



if (checkBox.length > 0){
  for (let i = 0; i < checkBox.length; i++){
    for (let i = 0; i < checkBox.length; i++){
        if (checkBox[i].checked === true){
          ul.removeChild(li[i]);
          this.todos.splice(i,1);
          allClear--;
     }
    }
    if (allClear === 1){
      i = -1;
    }
  }
 }
}
};
