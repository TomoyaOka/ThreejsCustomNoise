import { gsap, Power4 } from "gsap";

/*---------------
* setting
----------------*/
const worksButton = document.querySelector(".--page-button-works");
const worksArea = document.querySelector(".--works");
const worksBg = document.querySelector(".works-image-bg");

const archiveButton = document.querySelector(".--page-button-archive");
const archiveArea = document.querySelector(".--archive");
const arrowArchiveArea = document.querySelector(".ly-main__buttons--archive");
const arrowWorksArea = document.querySelector(".ly-main__buttons--works");
const archiveBg = document.querySelector(".archive-image-bg");

const totalArchiveArea = document.querySelector(".ly-main__total--archive");
const totalWorksArea = document.querySelector(".ly-main__total--works");
const mainBody = document.querySelectorAll(".ly-main__title");
const mainTitle = document.querySelectorAll(".ly-main__title span");
let className = "--current";

const settingParm = {
  rotate: "16deg",
};

let flag = false;
/*---------------
* action
----------------*/
worksButton.addEventListener("click", () => {
  siteTitleHide();
  worksButton.classList.add(className);
  archiveButton.classList.remove(className);
  arrowArchiveArea.style.visibility = "hidden";
  arrowWorksArea.style.visibility = "visible";
  archiveArea.style.pointerEvents = "none";
  worksArea.style.pointerEvents = "auto";
  totalArchiveArea.style.visibility = "hidden";
  totalWorksArea.style.visibility = "visible";

  gsap.to(archiveArea, {
    opacity: 0,
    duration: 1,
    ease: Power4.easeOut,
    zIndex: "-1",
  });
  gsap.to(archiveBg, {
    opacity: 0,
    duration: 1,
    ease: Power4.easeOut,
  });
  if (flag === false) {
    gsap.to(worksArea, {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: Power4.easeOut,
      zIndex: "5",
    });
    gsap.to(worksBg, {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: Power4.easeOut,
    });
    flag = true;
  } else {
    gsap.to(worksArea, {
      opacity: 1,
      duration: 1,
      delay: 0.9,
      ease: Power4.easeOut,
      zIndex: "5",
    });
    gsap.to(worksBg, {
      opacity: 1,
      duration: 1,
      delay: 0.9,
      ease: Power4.easeOut,
    });
  }
});

archiveButton.addEventListener("click", () => {
  siteTitleHide();
  archiveButton.classList.add(className);
  worksButton.classList.remove(className);
  arrowWorksArea.style.visibility = "hidden";
  arrowArchiveArea.style.visibility = "visible";
  worksArea.style.pointerEvents = "none";
  archiveArea.style.pointerEvents = "auto";
  totalWorksArea.style.visibility = "hidden";
  totalArchiveArea.style.visibility = "visible";

  gsap.to(worksArea, {
    opacity: 0,
    duration: 1,
    ease: Power4.easeOut,
    zIndex: "-1",
  });
  gsap.to(worksBg, {
    opacity: 0,
    duration: 1,
    ease: Power4.easeOut,
  });
  if (flag === false) {
    gsap.to(archiveArea, {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: Power4.easeOut,
      zIndex: "5",
    });
    gsap.to(archiveBg, {
      opacity: 1,
      duration: 1,
      delay: 1.5,
      ease: Power4.easeOut,
    });
    flag = true;
  } else {
    gsap.to(archiveArea, {
      opacity: 1,
      duration: 1,
      delay: 0.9,
      ease: Power4.easeOut,
      zIndex: "5",
    });
    gsap.to(archiveBg, {
      opacity: 1,
      duration: 1,
      delay: 0.9,
      ease: Power4.easeOut,
    });
  }
});

function siteTitleHide() {
  const timeline = gsap.timeline();
  timeline.to(mainTitle, {
    top: "-8rem",
    ease: Power4.easeIn,
    stagger: {
      from: "start",
      amount: 0.3,
    },
  });
}

/*---------------
* サイト読み込み時
----------------*/
window.addEventListener("load", () => {
  archiveArea.style.pointerEvents = "none";
  worksArea.style.pointerEvents = "none";
});

export default {};
