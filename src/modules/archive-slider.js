import { createClient } from "microcms-js-sdk";

const client = createClient({ serviceDomain: "ver3", apiKey: "2e262fbb2cce4b478254364f0fb64076b5ca" });
// service-domain は XXXX.microcms.io の XXXX 部分
client
  .get({
    endpoint: "sketch",
  })
  .then((res) => {
    /*----------
* 要素の取得
--------------*/
    const imgArea = document.querySelector(".archive-image");
    const next = document.querySelector(".ly-main__next--archive");
    const prev = document.querySelector(".ly-main__prev--archive");
    const total = document.querySelector(".ly-main__total--archive .--total");
    const totalCount = document.querySelector(".ly-main__total--archive .--total-count");
    const archiveArea = document.querySelector(".--archive");
    const TitleArea = document.querySelector(".--archive .ly-main__link-title");
    const numberArea = document.querySelector(".--archive .ly-main__link-number span");

    const imgArray = res.contents;
    const linkArray = res.contents;
    const TitleArray = res.contents;

    let imgCount = 1;

    /*----------
* 処理実行
--------------*/
    next.addEventListener("click", () => {
      if (imgCount === imgArray.length) {
        imgCount = 0;
      }
      imgArea.src = imgArray[imgCount].img.url;
      archiveArea.href = linkArray[imgCount].preview;
      TitleArea.innerHTML = TitleArray[imgCount].title;
      numberArea.innerHTML = imgCount + 1;

      imgCount++;
      arrowActive();
      count();
    });
    prev.addEventListener("click", () => {
      imgCount = imgCount - 1;
      imgArea.src = imgArray[imgCount - 1].img.url;
      archiveArea.href = linkArray[imgCount - 1].preview;
      TitleArea.innerHTML = TitleArray[imgCount - 1].title;
      numberArea.innerHTML = imgCount;

      arrowActive();
      count();
    });

    function arrowActive() {
      //prev
      if (imgCount === 1) {
        prev.style.pointerEvents = "none";
        prev.style.opacity = "0.3";
      } else {
        prev.style.pointerEvents = "auto";
        prev.style.opacity = "1";
      }
      //next
      if (imgCount === imgArray.length) {
        next.style.pointerEvents = "none";
        next.style.opacity = "0.3";
      } else {
        next.style.pointerEvents = "auto";
        next.style.opacity = "1";
      }
    }
    function count() {
      totalCount.innerHTML = imgCount;
    }

    /*------------------
* 初期セッティング
----------------------*/
    //画像セット
    imgArea.src = imgArray[0].img.url;
    //リンクセット
    archiveArea.href = linkArray[0].preview;
    //タイトルセット
    TitleArea.innerHTML = TitleArray[0].title;
    //prevを押せないようにスタイル適用
    prev.style.pointerEvents = "none";
    prev.style.opacity = "0.3";
    //初期位置をセット
    totalCount.innerHTML = imgCount;
    //投稿の総数セット
    total.innerHTML = res.contents.length;
    //初期No.
    numberArea.innerHTML = imgCount;
  })
  //エラーログ
  .catch((err) => console.log(err));

export default {};
