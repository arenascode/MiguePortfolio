const navBar: HTMLDivElement = document.querySelector(
  "#navBar"
) as HTMLDivElement;
const containerLogo: HTMLDivElement = document.querySelector(
  ".logo"
) as HTMLDivElement;

const nameLogo: HTMLDivElement = document.querySelector(
  ".name"
) as HTMLDivElement;
let walk: number = 25;

function showShadow(this: HTMLElement, e: MouseEvent): void {
  const { offsetWidth: width, offsetHeight: height } = navBar;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + (e.target as HTMLElement).offsetLeft;
    y = y + (e.target as HTMLElement).offsetTop;
  }
  const xWalk = (x / width) * walk - walk / 2;
  const yWalk = (y / height) * walk - walk / 2;
  console.log(xWalk, yWalk);nameLogo.style.removeProperty('transition')
  nameLogo.style.textShadow = `${xWalk}px ${yWalk}px 0 grey`;
}

function removeShadow() {
  nameLogo.style.transition = `all 0.3s ease-out`;
  nameLogo.style.removeProperty("text-shadow");
}
navBar.addEventListener("mousemove", showShadow);

navBar.addEventListener("mouseleave", removeShadow);
