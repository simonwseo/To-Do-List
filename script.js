const input = document.getElementById('listItem');
const addList = document.getElementById('addList');
const ul = document.querySelector('ul');
const checkBox = document.getElementsByClassName('completed');
const li = document.getElementsByTagName('li');
const body = document.getElementsByTagName('body')[0];
const displayItems = document.getElementById('displayItems');


/* Pressing Enter to Submit .. in progress*/
// body.addEventListener('keyPress', function (e){
//   var key = e.which || e.keyCode;
//   if (key == 13){
//     todoList.addTodo;
//   }
// })



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
       displayItems.textContent = 'Hide list';
       ul.style.display = 'block';
    }else{
        displayItems.textContent = 'Show list';
        ul.style.display = 'none';
    }


  },
  addTodo: function(todoText) {

   let compareText = "↠	" + todoText;
   let matchCounter = 0;
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
    let repeatTally = document.createElement('span');


    listItem.className = "todoStyle";
    listItem.innerHTML ="<p>" + "↠&Tab;" + todoText + "</p>";

    completedItem.type = 'checkbox';
    completedItem.className = 'completed';

    ul.appendChild(listItem);
    listItem.appendChild(container);
    container.appendChild(completedItem);
    container.appendChild(repeatTally);

    // Finding out how many repeats there are
    for(let i = 0; i < this.todos.length; i++){
      if (compareText === this.todos[i].todoText){
        matchCounter++;
      }
    }
    // Adding it as a tally
    if (matchCounter > 0){
      repeatTally.textContent = matchCounter;
    }


    input.value = "";

    this.todos.push({
      todoText: listItem.firstElementChild.textContent,
      completed: false
    });

// adding onclick attribute for the newly created check box item
  completedItem.onclick = function (event){
    let div = event.target.parentElement;
    let listItem = div.previousElementSibling;

    let position;

    for (let i = 0; i < todoList.todos.length; i++){
      if (listItem.textContent === todoList.todos[i].todoText){
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

         }
       }else{
         for(let i = 0; i < this.todos.length; i++){
           this.todos[i].completed = true;
           checkBox[i].checked = true;
       }
     }

  }

};
