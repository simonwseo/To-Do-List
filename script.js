const displayTodos = document.getElementById('displayTodos');
const toggleAll = document.getElementById('toggleAll');
const handlers = {
   displayTodos: () => {
      todoList.displayTodos();
    },
    toggleAll: () => {
      todoList.toggleAll();
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


displayTodos.addEventListener ('click', () => {
   todoList.displayTodos();
})

toggleAll.addEventListener ('click', () =>{
  todoList.toggleAll();
})
