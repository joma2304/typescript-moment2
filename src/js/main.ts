import { TodoList } from "./classTodolist"; // Importera TodoList-klassen

document.addEventListener('DOMContentLoaded', () => {
    const todoList = new TodoList(); // Skapa en ny TodoList

    // Hämta element där uppgifterna ska visas i variabel
    const todoContainer = document.getElementById('todo-container');

    // eventlyssnare för submit-händelse
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
        // Rensa container-elementet
        if (todoContainer) {
            todoContainer.innerHTML = '';
        }

        // Hämta todos från TodoList-objektet och sortera dem efter prio
        const todos = todoList.getTodos().sort((a, b) => a.priority - b.priority);

        // Kontrollera om todos är definierat och inte är tomt
        if (todos && todos.length > 0) {
            // Loopa igenom varje todo och skapa ett eget element för varje
            todos.forEach((todo, index) => {
                // Skapa ett nytt div-element för varje todo
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo-item');

                // Skapa en text för uppgiftens namn och prio
                const todoText = document.createElement('span');
                todoText.textContent = `${todo.task} - Prio: ${todo.priority}`;

                // Om uppgiften är markerad som klar, stryk över
                if (todo.completed) {
                    todoText.style.textDecoration = 'line-through';
                }

                // Lägg till det nya div-elementet till container-elementet
                todoDiv.appendChild(todoText);

                // Skapa en knapp för att markera uppgiften som klar
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Klar med uppgift';
                completeButton.classList.add('complete-btn');
                completeButton.addEventListener('click', () => {
                    todoList.markTodoCompleted(index);
                    showTodos(); // Uppdatera listan med uppgifter
                });
                todoDiv.appendChild(completeButton);

                // Skapa en knapp för att ta bort uppgiften
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Ta bort';
                removeButton.classList.add('remove-btn');
                removeButton.addEventListener('click', () => {
                    todoList.removeTodo(index);
                    showTodos();
                });
                todoDiv.appendChild(removeButton);

                // Lägg till det nya div-elementet till container-elementet
                if (todoContainer) {
                    todoContainer.appendChild(todoDiv);
                }
            });
        } else {
            console.log('Inga uppgifter att visa.');
        }
    }

    // Anropa funktion när sidan laddat
    showTodos();
});