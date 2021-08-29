// Theme changer controller
const themeChanger: HTMLButtonElement = document.querySelector(".todo-app__theme-changer") as HTMLButtonElement;

themeChanger.addEventListener("click", function (): void {
    this.classList.toggle("todo-app__theme-changer--active");
});
