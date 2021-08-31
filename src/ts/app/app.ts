import Todo from "./Todo";
import {
    createTodo,
    renderTodos,
    removeTodo,
    findTodo,
    updateItemsLeft,
    filtering,
    findTodoIndex
} from "./functions";
import interact from "interactjs";

// === Get elements ===

const todosContainer: HTMLElement = document.querySelector(".todo-app__todos-container") as HTMLElement;
const newTodoIsComplete: HTMLInputElement = document.getElementById("new-todo-is-complete") as HTMLInputElement;
const newTodoText: HTMLInputElement = document.querySelector(".todo-app__new-todo-input") as HTMLInputElement;
const itemsLeft: HTMLElement = document.querySelector(".todo-app__items-left-text") as HTMLElement;
const clearButton: HTMLButtonElement = document.querySelector(".todo-app__clear-completed-button") as HTMLButtonElement;
const filteringTools: HTMLElement = document.querySelector(".todo-app__filtering-tools") as HTMLElement;

// === Data ===

let todos: Array<Todo> = [];
let id: number = 0;
let currentFilter: string = "all";

// --- Example todos --- (Preview data)
interface todoData {
    [todo: string]: {
        isComplete: boolean,
        text: string
    }
}

const exampleTodos: todoData = {
    t1: { isComplete: true, text: "Complete online JavaScript course" },
    t2: { isComplete: false, text: "Jog around the park 3x" },
    t3: { isComplete: false, text: "10 minutes meditation" },
    t4: { isComplete: false, text: "Read for 1 hour" },
    t5: { isComplete: false, text: "Pick up groceries" },
    t6: { isComplete: false, text: "Complete Todo App on Frontend Mentor" }
}

// Create example todos
for (let t in exampleTodos) {
    createTodo(todos, exampleTodos[t].isComplete, exampleTodos[t].text, ++id);
    renderTodos(filtering(currentFilter, todos), todosContainer);
}

updateItemsLeft(itemsLeft, todos.length);

// === InteractJS ===

let positionY: number = 0;
let from: number;
let to: number;
let dragElement: Todo;
let dropElement: Todo;

interact(".todo").draggable({
    startAxis: "y",
    lockAxis: "y",
    listeners: {
        start (event) {
            from = findTodoIndex(todos, parseInt(event.target.id));
            dragElement = findTodo(todos, parseInt(event.target.id));
            event.target.style.zIndex = "1";
        },
        move (event) {
            positionY += event.dy;
            event.target.style.transform = `translateY(${ positionY }px)`;
        },
        end (event) {
            event.target.style.transform = "translateY(0)";
            event.target.style.zIndex = "0";
            positionY = 0;
        }
    }
}).dropzone({
    ondrop (event) {
        to = findTodoIndex(todos, parseInt(event.target.id));
        let helper: Todo = dragElement;
        dropElement = findTodo(todos, parseInt(event.target.id));
        todos[from] = dropElement;
        todos[to] = helper;
        renderTodos(filtering(currentFilter, todos), todosContainer);
    }
});

// === MAIN EVENTS ===

// Add new todo to todos array and render all todos
newTodoText.addEventListener("keyup", function (e): void {
    if (e.key === "Enter") {
        createTodo(todos, newTodoIsComplete.checked, newTodoText.value, ++id);
        newTodoText.value = "";
        updateItemsLeft(itemsLeft, todos.length);
        renderTodos(filtering(currentFilter, todos), todosContainer);
    }
});

// Delete todos event
todosContainer.addEventListener("click", function (e): void {
    let clicked: HTMLElement = e.target as HTMLElement;
    if (clicked.classList.contains("todo__delete-button") || clicked.classList.contains("todo__delete-icon")) {
        let parentTodo: HTMLElement = clicked.parentElement as HTMLElement;
        let todoId: number = parseInt(parentTodo.id);
        let filteredTodos: Array<Todo> = removeTodo(todos, todoId);
        todos = filteredTodos;
        updateItemsLeft(itemsLeft, todos.length);
        renderTodos(filtering(currentFilter, todos), todosContainer);

        // If todos container is empty, reset id variable
        if (todos.length === 0) id = 0;
    }
});

// Marking todos
todosContainer.addEventListener("input", function (e): void {
    let clicked: HTMLInputElement = e.target as HTMLInputElement;
    let todoToFind = findTodo(todos, parseInt(clicked.id));
    todoToFind.setIsComplete = clicked.checked;
    renderTodos(filtering(currentFilter, todos), todosContainer);
});

// Clear completed
clearButton.addEventListener("click", function (): void {
    let filteredTodos: Array<Todo> = filtering("active", todos);
    todos = filteredTodos;
    updateItemsLeft(itemsLeft, todos.length);
    renderTodos(filtering(currentFilter, todos), todosContainer);
});

// Filtering
filteringTools.addEventListener("input", function (e): void {
    let clicked: HTMLInputElement = e.target as HTMLInputElement;
    currentFilter = clicked.value;
    renderTodos(filtering(currentFilter, todos), todosContainer);
});
