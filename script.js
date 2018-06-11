const input = document.getElementById('listItem');
const addList = document.getElementById('addList');
const list = document.getElementById('theList');

input.addEventListener('keyPress', function (e){
  var key = e.which || e.keyCode;
  if (key == 13){
    todoList.addTodo;
  }
})



const handlers = {
   displayTodos: () => {
      todoList.displayTodos();
    },
    toggleAll: () => {
      todoList.toggleAll();
    },
    addTodo: () =>{
      todoList.addTodo(input.value);
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
  },
  addTodo: function(todoText) {


    this.todos.push({
      todoText: todoText,
      completed: false
    });

    let listItem = document.createElement('li');
    listItem.textContent = "↠" + input.value;
    theList.appendChild(listItem);

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
         }
       }else{
         for(let i = 0; i < this.todos.length; i++){
           this.todos[i].completed = true;
       }
     }

  }

};
