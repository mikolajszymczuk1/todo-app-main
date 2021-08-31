// Assets
import crossIcon from "../../svg/icon-cross.svg";
import checkIcon from "../../svg/icon-check.svg";

// Todo class
class Todo {
    private id: number;
    private text: string;
    private isComplete: boolean;

    constructor(isComplete: boolean, text: string, id: number) {
        this.id = id;
        this.text = text;
        this.isComplete = isComplete
    }

    public get getId(): number {
        return this.id;
    }

    public get getIsComplete(): boolean {
        return this.isComplete;
    }

    public get getText(): string {
        return this.text;
    }

    public set setIsComplete(newIsComplete: boolean) {
        this.isComplete = newIsComplete;
    }

    public render(): string {
        let toRender: string = `
            <div class="todo ${ this.isComplete ? "todo--completed" : ""}" id="${ this.id }">
                <div class="iscomplete">
                    <label class="iscomplete__label">
                        <input class="iscomplete__checkbox" type="checkbox" ${ this.isComplete ? `checked=""` : `` }>
                        <span class="iscomplete__custom-checkbox">
                            <img class="iscomplete__custom-checkbox-icon" src="${ checkIcon }" alt="Check icon image" title="Check">
                        </span>
                    </label>
                </div>
                                    
                <h2 class="todo__text">${ this.text }</h2>

                <button class="todo__delete-button">
                    <img class="todo__delete-icon" src="${ crossIcon }" alt="Cross icon image" title="Cross">
                </button>
            </div>
        `;

        return toRender;
    }
}

export default Todo;
