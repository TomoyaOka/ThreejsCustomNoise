/*------------------------------
* DOM取得
----------------------------------*/
const ballElement: any = document.querySelector<HTMLElement>(".cursor");
const buttonElements = document.querySelectorAll<HTMLElement>("a,button");
/*------------------------------
* 各セッティング
----------------------------------*/
const ballParam = {
  x: 0,
  y: 0,
  size: 100,
  r: Math.random() * 255,
  g: Math.random() * 255,
  b: Math.random() * 255,
  a: 1.0,
};

const mouseParam = {
  x: 0,
  y: 0,
};

const easeParam = {
  ease: 0.07, //遅延時間
};

/*------------------------------
* 処理定義
----------------------------------*/

function _styleInit(): void {
  //x,y軸に中央
  ballParam.x = window.innerWidth * 0.5 - ballParam.size * 0.5;
  ballParam.y = window.innerHeight * 0.5 - ballParam.size * 0.5;
  //ボールにスタイリングを適用
  ballElement.style.width = `${ballParam.size}px`;
  ballElement.style.height = `${ballParam.size}px`;
}

function _mouseMove(e: any) {
  // e.preventDefault();
  let win = window.innerWidth;
  if (win >= 768) {
    mouseParam.x = e.clientX;
    mouseParam.y = e.clientY;
  } else {
    mouseParam.x = e.changedTouches.pageX;
    mouseParam.y = e.changedTouches.pageY;
  }
}

function _ballMove(): void {
  //01.ボールをマウスの中心に。
  const mouseX = mouseParam.x - ballParam.size * 0.5;
  const mouseY = mouseParam.y - ballParam.size * 0.5;

  // 02. easeを追加
  ballParam.x += (mouseX - ballParam.x) * easeParam.ease;
  ballParam.y += (mouseY - ballParam.y) * easeParam.ease;

  //03. 02で設定した値をtop.leftにセット。
  ballElement.style.left = `${ballParam.x}px`;
  ballElement.style.top = `${ballParam.y}px`;

  requestAnimationFrame(_ballMove);
}

function _hover() {
  for (let i = 0; i < buttonElements.length; i++) {
    buttonElements[i].addEventListener("mouseenter", () => {
      ballElement.style.transform = "scale(2.5)";
    });
    buttonElements[i].addEventListener("mouseleave", () => {
      ballElement.style.transform = "scale(1)";
    });
  }
}

/*------------------------------
* 処理実行
----------------------------------*/

if ((navigator.userAgent.indexOf("iPhone") > 0 && navigator.userAgent.indexOf("iPad") == -1) || navigator.userAgent.indexOf("iPod") > 0 || navigator.userAgent.indexOf("Android") > 0) {
} else {
  function render(): void {
    _styleInit();
    _ballMove();
    _hover();
    window.addEventListener("mousemove", _mouseMove);
    window.addEventListener("touchmove", _mouseMove);
    window.addEventListener("resize", () => {
      _styleInit();
    });
  }
  render();
}

export default {};
