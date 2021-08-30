// Theme changer controller
const themeChanger: HTMLButtonElement = document.querySelector(".todo-app__theme-changer") as HTMLButtonElement;
const todoApp: HTMLElement = document.querySelector(".todo-app") as HTMLElement;
const body: HTMLElement = document.querySelector(".body") as HTMLElement;

themeChanger.addEventListener("click", function (): void {
    this.classList.toggle("todo-app__theme-changer--active");
    todoApp.classList.toggle("todo-app--dark");
    body.classList.toggle("body--dark");
});
