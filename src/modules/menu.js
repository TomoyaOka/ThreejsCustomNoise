import { gsap, Power4 } from "gsap";

/*---------------
* setting
----------------*/
const menuElement = document.querySelector(".ly-header__button");
const menuBodyElement = document.querySelector(".ly-detail-menu");
const menuImg = document.querySelector(".ly-detail-menu__image");
const menuTxt = document.querySelectorAll(".--down");
const AnimationPram = {
  easingOut: Power4.easeOut,
  easingIn: Power4.easeIn,
};
let flag = false;
/*---------------
* action
----------------*/
menuElement.addEventListener("click", () => {
  flag = !flag;
  if (flag === true) {
    openMove();
  } else {
    closeMove();
  }
});

/*---------------
* function
----------------*/
function openMove() {
  gsap.to(menuBodyElement, {
    height: "100vh",
    ease: AnimationPram.easingOut,
    duration: 1,
  });
  gsap.to(menuImg, {
    height: "60vh",
    ease: AnimationPram.easingOut,
    duration: 0.5,
    delay: 0.5,
  });
  for (let i = 0; i < menuTxt.length; i++) {
    gsap.to(menuTxt[i], {
      y: 0,
      rotate: 0,
      duration: 1,
      delay: 0.5,
      ease: AnimationPram.easingOut,
    });
  }
}

function closeMove() {
  gsap.to(menuBodyElement, {
    height: 0,
    ease: AnimationPram.easingIn,
    duration: 1,
    delay: 0.6,
  });
  gsap.to(menuImg, {
    height: 0,
    ease: AnimationPram.easingOut,
    duration: 0.5,
  });
  for (let i = 0; i < menuTxt.length; i++) {
    gsap.to(menuTxt[i], {
      y: "300%",
      rotate: "25deg",
      duration: 1,
      ease: AnimationPram.easingIn,
    });
  }
}

export default {};
