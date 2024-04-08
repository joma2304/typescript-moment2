import { TodoList } from "./classTodolist"; // Importera TodoList-klassen

document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList(); // Skapa en ny TodoList

    // Hämta referensen till <ul> elementet där uppgifterna ska visas
    const todoListElement = document.getElementById('todo-list');

    // Lyssna på formulärets submit-händelse
    const form = document.getElementById('form') as HTMLFormElement;
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Förhindra standardformulärbeteende

        // Hämta uppgift och prioritet från formuläret
        const taskInput = document.getElementById('task') as HTMLInputElement;
        const priorityInput = document.getElementById('priority') as HTMLInputElement;
        const task = taskInput.value;
        const priority = Number(priorityInput.value);

        if (task && priority) { // Kontrollera att både uppgift och prioritet finns
            const added = todoList.addTodo(task, priority); // Lägg till uppgiften i TodoList

            if (added) { // Om uppgiften har lagts till, rensa inmatningsfälten
                taskInput.value = '';
                priorityInput.value = '';
                showTodos(); // Uppdatera listan med uppgifter
            } else {
                alert('Felaktig uppgift eller prioritet.'); // Visa felmeddelande om uppgiften inte kunde läggas till
            }
        } else {
            alert('Vänligen fyll i både uppgift och prioritet.'); // Visa felmeddelande om något fält saknas
        }
    });

    function showTodos() {
    
        // Kontrollera om todoList.getTodos() returnerar en icke-null lista
        const todos = todoList.getTodos();
        if (todoListElement) {
            // Loopa igenom varje uppgift i TodoList och skriv ut dem
            todos.forEach(todo => {
                // Skapa ett nytt <li> element för varje uppgift
                const todoItem = document.createElement('li');
                todoItem.textContent = todo.task; // Sätt textinnehållet till uppgiftens namn
                todoListElement.appendChild(todoItem); // Lägg till <li> i <ul>
            });
        } else {
            console.log('Inga uppgifter att visa.');
        }
    }

    // Anropa funktion när sidan laddat
    showTodos();
});