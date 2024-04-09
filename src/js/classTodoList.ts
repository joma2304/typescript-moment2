import { iTodoList } from "iTodoList"

export class TodoList {
    private todos: iTodoList[]; //Tom array av objekten i todolist
  
    constructor() {
      this.todos = this.loadFromLocalStorage(); // LAddar från localstorage
    }
  
    //Metod för att lägga till todo
    addTodo(task: string, priority: number): { success: boolean, message: string } {
      if (task && priority >= 1 && priority <= 3) {
          const newTodo: iTodoList = { task, completed: false, priority };
          this.todos.push(newTodo);
          this.saveToLocalStorage();
          return { success: true, message: "Att göra har lagts till." };
      } else {
          return { success: false, message: "Inmatade värden är fel." };
      }
  }

    //Metod för att ta bort todo
    removeTodo(index: number): void {
      if (index >= 0 && index < this.todos.length) {
          this.todos.splice(index, 1); // Ta bort uppgiften från arrayen
          this.saveToLocalStorage(); // Uppdatera lokal lagring
      }
  }
  
  //Metod för att markera som klar
    markTodoCompleted(todoIndex: number): void {
      if (todoIndex >= 0 && todoIndex < this.todos.length) {
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage();
      }
    }
  
    //Metod för att returnera lista med todos
    getTodos(): iTodoList[] {
      return this.todos;
    }
  
    //Metod för att spara till localstorage
    saveToLocalStorage(): void {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  
    //Metod för att ladda från localstorage
    loadFromLocalStorage(): iTodoList[] {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
  }