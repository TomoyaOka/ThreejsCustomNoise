window.addEventListener("load", () => {
  document.addEventListener(
    "dblclick",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );

  document.body.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    },
    { passive: false }
  );
});

export default {};
