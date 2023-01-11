import { gsap, Power4 } from "gsap";

const delayElements = document.querySelectorAll(".js-delay");
const filter = document.querySelector(".opening-filter");
const siteTitleBody = document.querySelectorAll(".site-title");
const mainTitle = document.querySelectorAll(".ly-main__title span");

const siteTitle = document.querySelectorAll(".site-title--alphabet");

let startTime = 0.8;

const tl = gsap.timeline();

tl.to(filter, {
  backgroundColor: "rgba(0,0,0,0)",
  duration: 0.8,
  ease: Power4.easeOut,
  delay: startTime,
})
  .to(
    siteTitle,
    {
      opacity: 1,
      duration: 0.8,
    },
    "<0.5"
  )
  .to(siteTitle, {
    top: "-3rem",
    ease: Power4.easeIn,
    stagger: {
      from: "start",
      amount: 0.1,
    },
  })
  .to(filter, {
    pointerEvents: "none",
  })
  .to(siteTitleBody, {
    position: "absolute",
    top: "1.8rem",
    left: "2rem",
    duration: 0.01,
  })
  .to(siteTitle, {
    top: "0",
    ease: Power4.easeOut,
    stagger: {
      from: "start",
      amount: 0.2,
    },
  })
  .to(
    mainTitle,
    {
      top: 0,
      stagger: {
        from: "start",
        amount: 0.2,
      },
    },
    "<"
  );

for (let i = 0; i < delayElements.length; i++) {
  gsap.to(delayElements[i], {
    opacity: 1,
    duration: 1.5,
    ease: Power4.easeOut,
    delay: startTime + 2.2,
  });
}

export default {};
