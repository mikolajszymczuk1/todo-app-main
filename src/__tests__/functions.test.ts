// Tests for helper functions
import Todo from "../ts/app/Todo";
import {
    createTodo,
    renderTodos,
    removeTodo,
    findTodo,
    updateItemsLeft,
    filtering,
    findTodoIndex
} from "../ts/app/functions";


// ===================================
describe("createTodo", (): void => {
    let todos: Array<Todo> = [];
    createTodo(todos, true, "test", 1);

    test("Should push new Todo item to array (todos.length should be 1)", (): void => {
        expect(todos.length).toEqual(1);
    });

    test("todos new item should be instance of Todo", (): void => {
        expect(todos[0]).toBeInstanceOf(Todo);
    });

    test("new todo should has: isComplete = true, text = 'test', id = 1", (): void => {
        let todo = todos[0];
        expect(todo.getIsComplete).toBeTruthy;
        expect(todo.getId).toEqual(1);
        expect(todo.getText).toEqual("test");
    });
});

// ===================================
describe("renderTodos", (): void => {
    const testContainer: HTMLDivElement = document.createElement("div");
    const anotherTestContainer: HTMLDivElement = document.createElement("div");
    let todos: Array<Todo> = [];
    createTodo(todos, true, "test", 1);
    renderTodos(todos, testContainer);
    anotherTestContainer.innerHTML = todos[0].render();

    test("test container should contain correct todo structure", (): void => {
        expect(testContainer.innerHTML).toEqual(anotherTestContainer.innerHTML);
    });
});

// ===================================
describe("removeTodo", (): void => {
    let todos: Array<Todo> = [];
    createTodo(todos, true, "test1", 1);
    createTodo(todos, false, "test2", 2);

    test("After remove new array should have only one element", (): void => {
        expect(removeTodo(todos, 1).length).toEqual(1);
    });

    test("After remove todo with id = 1, new array should have only todo with id = 2", (): void => {
        expect(removeTodo(todos, 1)[0].getId).toEqual(2);
    });
});

// ===================================
describe("findTodo", (): void => {
    let todos: Array<Todo> = [];
    createTodo(todos, true, "test1", 1);
    createTodo(todos, false, "test2", 2);

    test("findTodo() with id = 1, should return todo with id = 1", (): void => {
        expect(findTodo(todos, 1).getId).toEqual(1);
    });

    test("findTodo() with id = 2, should return todo with id = 2", (): void => {
        expect(findTodo(todos, 2).getId).toEqual(2);
    });

    test("when there is no todo with id = 3 it should return undefined", (): void => {
        expect(findTodo(todos, 3)).toBe(undefined);
    });
});

// ===================================
describe("updateItemsLeft", (): void => {
    const testDiv: HTMLDivElement = document.createElement("div");

    test("After call updateItemsLeft with howItems = 3, testDiv should contain: '3 items left'", (): void => {
        updateItemsLeft(testDiv, 3);
        expect(testDiv.innerText).toEqual("3 items left");
    });
});

// ===================================
describe("filtering", (): void => {
    let todos: Array<Todo> = [];
    createTodo(todos, false, "test", 1);
    createTodo(todos, false, "active", 2);
    createTodo(todos, true, "complete", 3);

    test("call filtering() with filterCategory = all, should return array with all 3 test todos", (): void => {
        let filteredTodos: Array<Todo> = filtering("all", todos);
        expect(filteredTodos.length).toEqual(3);
        expect(filteredTodos[0].getId).toEqual(1);
        expect(filteredTodos[1].getId).toEqual(2);
        expect(filteredTodos[2].getId).toEqual(3);
    });

    test("call filtering() with filterCategory = active, should return array with 2 active test todos", (): void => {
        let filteredTodos: Array<Todo> = filtering("active", todos);
        expect(filteredTodos.length).toEqual(2);
        expect(filteredTodos[0].getId).toEqual(1);
        expect(filteredTodos[1].getId).toEqual(2);
    });

    test("call filtering() with filterCategory = complete, should return array with 1 complete test todo", (): void => {
        let filteredTodos: Array<Todo> = filtering("complete", todos);
        expect(filteredTodos.length).toEqual(1);
        expect(filteredTodos[0].getId).toEqual(3);
    });
});

// ===================================
describe("findTodoIndex", (): void => {
    let todos: Array<Todo> = [];
    createTodo(todos, false, "test1", 1);
    createTodo(todos, false, "test2", 2);
    createTodo(todos, false, "test3", 3);

    test("when wanted todo is in array, should return this todo's id", (): void => {
        expect(findTodoIndex(todos, 3)).toEqual(2);
    });

    test("when wanted todo isn't in array, should return -1", (): void => {
        expect(findTodoIndex(todos, 10)).toEqual(-1);
    });
});
