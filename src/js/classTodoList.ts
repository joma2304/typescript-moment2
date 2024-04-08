import { iTodoList } from "./iTodoList"

export class TodoList {
    private todos: iTodoList[]; //Tom array av objekten i todolist
  
    constructor() {
      this.todos = this.loadFromLocalStorage(); // LAddar från localstorage
    }
  
    addTodo(task: string, priority: number): boolean {
      if (task && priority >= 1 && priority <= 3) {
        const newTodo: iTodoList = { task, completed: false, priority };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
      }
      return false;
    }

    removeTodo(index: number): void {
      if (index >= 0 && index < this.todos.length) {
          this.todos.splice(index, 1); // Ta bort uppgiften från arrayen
          this.saveToLocalStorage(); // Uppdatera lokal lagring
      }
  }
  
    markTodoCompleted(todoIndex: number): void {
      if (todoIndex >= 0 && todoIndex < this.todos.length) {
        this.todos[todoIndex].completed = true;
        this.saveToLocalStorage();
      }
    }
  
    getTodos(): iTodoList[] {
      return this.todos;
    }
  
    saveToLocalStorage(): void {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  
    loadFromLocalStorage(): iTodoList[] {
      const storedTodos = localStorage.getItem('todos');
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
  }