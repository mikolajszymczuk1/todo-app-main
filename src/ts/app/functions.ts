// All helper functions
import Todo from "./Todo";

/** Create new todo and add it to array */
function createTodo(arr: Array<Todo>, isComplete: boolean, text: string, id: number): void {
    let newTodo: Todo = new Todo(isComplete, text, id);
    arr.push(newTodo);
}

/** Function render all todos on page */
function renderTodos(todosArray: Array<Todo>, containerElement: HTMLElement): void {
    containerElement.innerHTML = "";

    for (let i = 0; i < todosArray.length; i++) {
        containerElement.innerHTML += todosArray[i].render();
    }
}

/** Function remove todo with id = 'id' */
function removeTodo(arr: Array<Todo>, id: number): Array<Todo> {
    return arr.filter((el: Todo) => { return el.getId != id });
}

/** Return todo with id = 'id' */
function findTodo(arr: Array<Todo>, id: number): Todo {
    return arr.filter((el: Todo) => { return el.getId === id })[0];
}

/** Update items left text */
function updateItemsLeft(el: HTMLElement, howItems: number): void {
    el.innerText = howItems.toString() + " items left";
}

/** Return all, active or completed todos  */
function filtering(filterCategory: string, arr: Array<Todo>): Array<Todo> {
    if (filterCategory === "all") {
        return arr;    
    } else if (filterCategory === "active") {
        return arr.filter((el: Todo) => { return el.getIsComplete === false });
    }

    return arr.filter((el: Todo) => { return el.getIsComplete === true });
}

/** Return index of todo with id = 'id' */
function findTodoIndex(arr: Array<Todo>, id: number): number {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].getId === id) {
            return i;
        }
    }

    return -1;
}

export {
    createTodo,
    renderTodos,
    removeTodo,
    findTodo,
    updateItemsLeft,
    filtering,
    findTodoIndex
}
