// Tests for Todo class
import Todo from "../ts/app/Todo";

describe("Todo class", (): void => {
    let todo: Todo = new Todo(false, "test", 1);
    let todoRender: string = todo.render();

    test("todo should be instance of Todo", (): void => {
        expect(todo).toBeInstanceOf(Todo);
    });

    test("getId should be equal 1", (): void => {
        expect(todo.getId).toEqual(1);
    });

    test("getText should be equal 'test'", (): void => {
        expect(todo.getText).toEqual("test");
    });

    test("getIsComplete should be equal true", (): void => {
        expect(todo.getIsComplete).toBeFalsy;
    });

    test("setIsComplete should correctly change isComplete value", (): void => {
        expect(todo.getIsComplete).toBeFalsy;
        todo.setIsComplete = true;
        expect(todo.getIsComplete).toBeTruthy;
    });

    test("render method should return correct todo structure", (): void => {
        let testResult: string = `
            <div class="todo " id="1">
                <div class="iscomplete">
                    <label class="iscomplete__label">
                        <input class="iscomplete__checkbox" type="checkbox" >
                        <span class="iscomplete__custom-checkbox">
                            <img class="iscomplete__custom-checkbox-icon" src="undefined" alt="Check icon image" title="Check">
                        </span>
                    </label>
                </div>
                                    
                <h2 class="todo__text">test</h2>

                <button class="todo__delete-button">
                    <img class="todo__delete-icon" src="undefined" alt="Cross icon image" title="Cross">
                </button>
            </div>
        `;

        expect(todoRender).toEqual(testResult);
    });
});
