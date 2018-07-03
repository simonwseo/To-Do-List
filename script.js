var input = document.getElementById('listItem');
var addList = document.getElementById('addList');
var li = document.getElementsByTagName('li');
var ul = document.querySelector('ul');
var checkBox = document.getElementsByClassName('completionStatus');
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
       displayItems.style.backgroundColor = 'black';
       displayItems.style.color = 'white';
       ul.style.display = 'block';
    }else{
        displayItems.textContent = 'Show List';
        displayItems.style.backgroundColor = 'white';
        displayItems.style.color = 'black';
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
    let firstContainer = document.createElement('div');
    let secondContainer = document.createElement('div');
    let todoParagraph = document.createElement('p');
    let completedItem = document.createElement('input');
    let deleteButton = document.createElement('button');
    let changeButton = document.createElement('button');

    listItem.className = "todoStyle";

    firstContainer.className = 'firstContainer';
    secondContainer.className = 'secondContainer';

    todoParagraph.textContent = todoItem;

    completedItem.type = 'checkbox';
    completedItem.className = 'completionStatus';

    deleteButton.textContent = 'X';
    deleteButton.className = 'deleteButton';

    changeButton.innerHTML = '&#9998;'
    changeButton.className = 'changeButton'


    ul.appendChild(listItem);
    listItem.appendChild(firstContainer);
    listItem.appendChild(secondContainer);
    firstContainer.appendChild(completedItem);
    firstContainer.appendChild(todoParagraph);
    secondContainer.appendChild(deleteButton);
    secondContainer.appendChild(changeButton);

//Reset the input value after creating the todo item
    input.value = "";

//Push the newly created todo item into the array
    this.todos.push({
      todoText: todoItem,
      completed: false,
      buttonsCreated: false
    });

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
    let todo = this.todos;
    let completedTodos = 0;

   //counting how many completed todos there are
    this.todos.forEach(function (todo){
      if (todo.completed === true){
        completedTodos++;
      }
    });

    //if everything is completed then toggle all incomplete
    if (todo.length === completedTodos){
         todo.forEach(function (todo,position){
           todo.completed = false;
           checkBox[position].checked = false;

           li[position].style.color ="black";
           li[position].style.fontStyle = 'normal';
           li[position].style.textDecoration = 'none';
         })
      //if opposite, toggle everything completed
       }else{
          todo.forEach(function (todo,position){
           todo.completed = true;
           checkBox[position].checked = true;

           li[position].style.color = 'gray';
           li[position].style.fontStyle = 'italic';
           li[position].style.textDecoration = 'line-through';
       })
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

      this.todos.forEach(function (todo,position){
        if(checkBox[position].checked ===true){
          allClear++;
        }
      })

      // if everything is checked then delete everything in ul/array
      if (allClear === checkBox.length){
        ul.innerHTML = "";
        this.todos.splice(0,this.todos.length);
      }else{ // if not, delete just the checked items
        debugger;
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
},

findButtonPosition: function(eventTarget, button){
  let buttonPosition;

  this.todos.forEach( function(todo,position){
    if (eventTarget === button[position]){
      buttonPosition = position;
    }
  })
  return  buttonPosition;
}

};

ul.addEventListener('click', function(event) {
  let todo = todoList.todos;
  let p = document.getElementsByTagName('p');
  let changeButton = document.getElementsByClassName('changeButton');
  let deleteButton = document.getElementsByClassName('deleteButton');

  if(event.target.className === 'changeButton'){
    let todoParagraph = event.target.parentNode.previousElementSibling.childNodes[1];
    let buttonPosition = todoList.findButtonPosition(todoParagraph,p);
    let currentTodoText = todoParagraph.textContent;

    todoParagraph.textContent = '';


    todo.forEach( function(todo,position) {
        changeButton[position].style.display = 'none';
        deleteButton[position].style.display = 'none';
    })

    while(currentTodoText.charAt(0) === '↠'){
      currentTodoText = currentTodoText.substr(1);
    }

    let changeInput = document.createElement('input');
    changeInput.type = 'text';
    changeInput.className = 'changeInput';
    changeInput.value = currentTodoText;
    todoParagraph.appendChild(changeInput);

    if (todo[buttonPosition].buttonsCreated === false){
      let div = event.target.parentNode;
      let submitButton = document.createElement('button');
      let cancelButton = document.createElement('button');
      cancelButton.innerHTML = 'X';
      cancelButton.className = 'cancelButton';
      submitButton.innerHTML = '&check;';
      submitButton.className = 'submitButton';

      div.appendChild(submitButton);
      div.appendChild(cancelButton);

      todo[buttonPosition].buttonsCreated = true;
    }else{
      let submitButton = event.target.nextElementSibling;
      let cancelButton = submitButton.nextElementSibling;

      submitButton.style.display ='inline-block';
      cancelButton.style.display ='inline-block';
    }
     addList.disabled = true;
  }

  if(event.target.className === 'submitButton'){

    let changeInput = document.getElementsByClassName('changeInput');
    let submitButton = event.target;
    let cancelButton = event.target.nextElementSibling;
    let todoParagraph = event.target.parentNode.previousElementSibling.childNodes[1];
    let newTodoText = '↠' + changeInput[0].value;
    todoParagraph.textContent = newTodoText;

    let buttonPosition = todoList.findButtonPosition(todoParagraph, p);
    todoList.changeTodo(buttonPosition, newTodoText);

    todo.forEach( function(todo,position) {
       changeButton[position].style.display = 'inline-block';
       deleteButton[position].style.display = 'inline-block';
    })

    submitButton.style.display = 'none';
    cancelButton.style.display = 'none';

    addList.disabled = false;
   }

   if(event.target.className === 'cancelButton'){
     let cancelButton = event.target;
     let submitButton = event.target.previousElementSibling;
     let todoParagraph = event.target.parentNode.previousElementSibling.childNodes[1];
     let buttonPosition = todoList.findButtonPosition(todoParagraph, p);

     todoParagraph.innerHTML = todo[buttonPosition].todoText;

     todo.forEach( function(todo,position) {
        changeButton[position].style.display = 'inline-block';
        deleteButton[position].style.display = 'inline-block';
     })
     cancelButton.style.display = 'none';
     submitButton.style.display = 'none';

     addList.disabled = false;
   }

   if(event.target.className === 'deleteButton'){
     let todoListItem = event.target.parentNode.parentNode;
     let todoParagraph = event.target.parentNode.previousElementSibling.childNodes[1];
     let buttonPosition = todoList.findButtonPosition(todoParagraph, p);

     if (confirm ('Are you sure you want to delete this item?')){
       todoList.deleteTodo(buttonPosition);
       ul.removeChild(todoListItem);
     }
   }

   if(event.target.className === 'completionStatus'){
    let todoParagraph = event.target.nextElementSibling;
    let todoListItem = todoParagraph.parentNode.parentNode;
    let buttonPosition = todoList.findButtonPosition(todoParagraph, p);

    todoList.toggleCompleted(buttonPosition);

    if(todo[buttonPosition].completed === true){
      todoListItem.style.color = 'gray';
      todoListItem.style.fontStyle = 'italic';
      todoListItem.style.textDecoration = 'line-through';
    }else{
      todoListItem.style.color ="black";
      todoListItem.style.fontStyle = 'normal';
      todoListItem.style.textDecoration = 'none';
      }
   }

})
