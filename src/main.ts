import Swal from "sweetalert2"

//** Shadow effect in Logo **//

const navBar: HTMLDivElement = document.querySelector(
  "#navBar"
) as HTMLDivElement;
// const containerLogo: HTMLDivElement = document.querySelector(
//   ".logo"
// ) as HTMLDivElement;

const nameLogo: HTMLDivElement = document.querySelector(
  ".name"
) as HTMLDivElement;
let walk: number = 25;

function showShadow(this: HTMLElement, e: MouseEvent): void {
  console.log(window.innerWidth);
  
  if (window.innerWidth <= 800) return;

  const { offsetWidth: width, offsetHeight: height } = navBar;
  let { offsetX: x, offsetY: y } = e;

  if (this !== e.target) {
    x = x + (e.target as HTMLElement).offsetLeft;
    y = y + (e.target as HTMLElement).offsetTop;
  }
  const xWalk = (x / width) * walk - walk / 2;
  const yWalk = (y / height) * walk - walk / 2;

  nameLogo.style.removeProperty("transition");
  nameLogo.style.textShadow = `${xWalk}px ${yWalk}px 0 grey`;
}

function removeShadow() {
  nameLogo.style.transition = `all 0.3s ease-out`;
  nameLogo.style.removeProperty("text-shadow");
}

navBar.addEventListener("mousemove", showShadow);

navBar.addEventListener("mouseleave", removeShadow);

// ** Show Modal in Mobile and Tablet Design **//
const burguerBtn: HTMLButtonElement = document.querySelector('.menuModalBtn') as HTMLButtonElement

const navMenuMobile: HTMLDivElement = document.querySelector('.navBar_Mobile') as HTMLDivElement

const closeModalBtn: HTMLButtonElement = document.querySelector('.closeModalBtn') as HTMLButtonElement


function showModalMenu(): void {
  navMenuMobile.style.display = 'block'
  setTimeout(() => {
  navMenuMobile.style.opacity = '1';
    
  }, 10);
}

function closeModal(): void {
  navMenuMobile.style.opacity = '0'
  setTimeout(() => {
    navMenuMobile.style.display = 'none'
  }, 500);
}

burguerBtn.addEventListener('click', showModalMenu)

closeModalBtn.addEventListener('click', closeModal)

window.onclick = function (e) {
  if (e.target == navMenuMobile) {
    navMenuMobile.style.opacity = '0'
    setTimeout(() => {
    navMenuMobile.style.display = "none";
      
    }, 500);
  }
}

//** fix nav */

// window.onscroll = function () {
//   if (window.scrollY >= navBar.offsetTop) {
//     navBar.style.display = 'fixed'
//     document.body.style.paddingTop = navBar.offsetHeight + 'px'
//   } else {
//     document.body.style.paddingTop = '0'
//   }
// }
// ** Send Contact Message to Server **//

const form: HTMLFormElement = document.querySelector("form") as HTMLFormElement;

if (form instanceof HTMLFormElement) {

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dataForm = new FormData(form);
    const name = dataForm.get("name");
    const email = dataForm.get("email")
    const message = dataForm.get("message")

    const dataToSend = {
      name,
      email,
      message
    }
    
    // ** SweetAlert Config
    const Toast = Swal.mixin({
      toast: true,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    fetch('http://localhost:8080/api/form', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: { 'content-type': 'application/json' }
    })
      .then(res => {
        if (res.status == 200) {
          Toast.fire({
            icon: "success",
            title:
              "Gracias Por Tu Mensaje! En Breve Me comunicaré contigo",
          });
          form.reset()
        } else if (res.status == 400){
          res.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: `${data}`,
              timer: 0,
              timerProgressBar: false,
              showConfirmButton: true,
            });
          })
        } else if (res.status == 500) {
          res.json().then((data) => {
            Toast.fire({
              icon: "error",
              title: `${data.errorMsg}`,
              timer: 0,
              timerProgressBar: false,
              showConfirmButton: true,
            });
          });
        }
      }).catch(err => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: `${err.message}`,
          timer: 0,
          timerProgressBar: false,
          showConfirmButton: true,
        });
      })
  });
}
