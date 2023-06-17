export function validator(element: HTMLButtonElement) {
  const i = document.getElementById("resourceInput") as HTMLInputElement;
  element.addEventListener("click", () => console.log(i?.value));
}
