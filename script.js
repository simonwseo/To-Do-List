var input = document.getElementById('listItem');
var addList = document.getElementById('addList');
var li = document.getElementsByTagName('li');
var ul = document.querySelector('ul');
var changeInput = document.getElementsByClassName('changeInput');
var checkBox = document.getElementsByClassName('completed');
var deleteItem = document.getElementsByClassName('deleteButton');
var changeItem = document.getElementsByClassName('changeButton');
var cancelItem = document.getElementsByClassName('cancelButton');
var submitItem = document.getElementsByClassName('submitButton');
var displayItems = document.getElementById('displayItems');

var handlers = {
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

   let todoItem = "↠" + todoText;
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
    //Also create another div to store all the buttons in
    let listItem = document.createElement('li');
    let container = document.createElement('div');
    let completedItem = document.createElement('input');
    let deleteButton = document.createElement('button');
    let changeButton = document.createElement('button');

    listItem.className = "todoStyle";
    listItem.innerHTML ="<p>" + todoItem + "</p>";

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

//Reset the input value after creating the todo item
    input.value = "";

//Push the newly created todo item into the array
    this.todos.push({
      todoText: todoItem,
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
        deleteItem[i].disabled = true;
      }

// p is pointing to the paragraph element with the todo text
      let div = event.target.parentNode;
      let p = div.previousElementSibling;
      let previousText = p.textContent;
      let listPosition; // variable to store the position of the todo item


      for (let i = 0; i < todoList.todos.length; i++){
        if (event.target === changeItem[i]){
          listPosition = i;
        }
      }

      //gets rid of the special character in the front when displayed in the placeholder
      while(previousText.charAt(0) === '↠'){
        previousText = previousText.substr(1);
      }
      //when the edit button is clicked a new input will pop up for the user to type in their new text.
      p.innerHTML = '↠<input type="text" class="changeInput" placeholder=" ' + previousText + '">';

      //the edit button will be hidden and cancel/submit button will be displayed
      changeItem[listPosition].style.display = 'none';

    //if the buttons aren't created yet, they will be created when the change button is pressed
    if (todoList.todos[listPosition].buttonsCreated === false){
      let submitButton = document.createElement ('button');
      let cancelButton = document.createElement('button');

      cancelButton.innerHTML = '&cross;';
      cancelButton.className = 'cancelButton';
      submitButton.innerHTML = '&check;';
      submitButton.className = 'submitButton';

      div.appendChild(submitButton);
      div.appendChild(cancelButton);

      todoList.todos[listPosition].buttonsCreated = true; //this prevents duplicate buttons from being created

      //Submit button's onclick
      submitButton.onclick = function (event){

        //uses the event.target to have variable point directly at the buttons being pressed
        let submitButton = event.target;
        let cancelButton = event.target.nextElementSibling;
        let newTodo = '↠' + changeInput[0].value; //text value in the change input will be stored here

        p.textContent = newTodo; //Replaces the previous todo item with edited version
        todoList.changeTodo(listPosition,newTodo); //updates the array

        //enables the other buttons
        for (let i = 0; i < changeItem.length;i++){
          if(changeItem[i] !== event.target){
            changeItem[i].disabled = false;
            deleteItem[i].disabled = false;
          }
        }

      changeItem[listPosition].style.display = 'inline-block'; //brings back the change button
      // hides the submit and cancel buttons
      cancelButton.style.display = 'none';
      submitButton.style.display = 'none';
      // add button is enabled
      addList.disabled = false;
      }

      //Cancel edit button
        cancelButton.onclick = function (event){

          //same as submit button
          let cancelButton = event.target;
          let submitButton = event.target.previousElementSibling;

          //when canceled, the previous text will be maintained
          p.innerHTML = todoList.todos[listPosition].todoText; //grabs the previous text from array

          //enables the change and delete buttons
          for (let i = 0; i < changeItem.length;i++){
            if(changeItem[i] !== event.target){
              changeItem[i].disabled = false;
              deleteItem[i].disabled = false;
            }
          }

        //brings back change button and hide the submit & cancel buttons
        changeItem[listPosition].style.display = 'inline-block';
        cancelButton.style.display = 'none';
        submitButton.style.display = 'none';
        //add button also enabled
        addList.disabled = false;
        }

    }else{
      //if the list item already has submit & cancel button, it just reveals them instead of creating new ones
      let submitItem = event.target.nextElementSibling;
      let cancelItem = submitItem.nextElementSibling;

      submitItem.style.display ='inline-block';
      cancelItem.style.display ='inline-block';
    }
   // disable the add button while item gets edited.
      addList.disabled = true;

    }

//Deleting Todos
    deleteButton.onclick = function (event){
        let div = event.target.parentNode;
        let todoItem = div.parentNode;
        let position;

      //grabs the position of the delete button
      for (let i = 0; i < todoList.todos.length; i++){
        	if (event.target === deleteItem[i]){
            position = i;
          }
        }
      //Asks the user if they want to delete the item, if yes then delete from list/array
        if (confirm ('Are you sure you want to delete this item?')){
        todoList.deleteTodo(position);
        ul.removeChild(todoItem);
      }else{
        //Do nothing
      }
      //enables the add button
       addList.disabled = false;
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
    li[position].style.color ="#e5e5e5";
    li[position].style.fontStyle = 'normal';
    li[position].style.textDecoration = 'none';
  }
   }
  }
},


  changeTodo: function(targetNum, content) {
  this.todos[targetNum].todoText = content; //changing array item's text content
  },
  deleteTodo: function(itemNumber){
    this.todos.splice(itemNumber, 1); //removing array item's text content
  },
  toggleCompleted: function(position){
    let todo = this.todos[position];
    todo.completed = !todo.completed; //toggles incomplete/complete
  },

  toggleAll: function(){

    let totalTodos = this.todos.length;
    let completedTodos = 0;

   //counting how many completed todos there are
    this.todos.forEach(function (todo){
      if (todo.completed === true){
        completedTodos++;
      }
    });

    //if everything is completed then toggle all incomplete
    if (totalTodos === completedTodos){
         for(let i = 0; i < totalTodos; i++){
           this.todos[i].completed = false;
           checkBox[i].checked = false;

           li[i].style.color ="#e5e5e5";
           li[i].style.fontStyle = 'normal';
           li[i].style.textDecoration = 'none';

         }
      //if opposite, toggle everything completed
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

     //clears out the whole list & the array
     if (confirm ('Are you sure you want to delete everything?')){
       ul.innerHTML = "";
       todo.splice(0,todo.length);
       }else{
         //Do nothing
       }
     //if user was in middle of editing, add list would be disabled, so enable it when using deleteAll
       addList.disabled = false;
    },

//Clears all that are Checked
    clearAllChecked: function(){
      let allClear = 0;

      // counts how many list items are checked as completed
      for (let i = 0; i < checkBox.length; i++){
        if (checkBox[i].checked === true){
          allClear++;
        }
      }

      // if everything is checked then delete everything in ul/array
      if (allClear === checkBox.length){
        ul.innerHTML = "";
        this.todos.splice(0,this.todos.length);
      }else{ // if not, delete just the checked items
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

 addList.disabled = false;
}
};
