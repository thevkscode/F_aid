var heading = "We Provide Easy Analysis";
var ans = [
    "A market-neutral trading strategy enabling traders to profit from virtually any market conditions, i.e., uptrend, downtrend, or sideways movement. The strategy monitors the performance of two historically correlated securities.",
    "Pair Trading takes advantage of the deviation in valuation of correlated stocks due to the dynamic nature of the market. The strategy is to short the outperforming stock and long the underperforming one, betting that the 'spread' between the two will eventually converge.",
    "Market neutrality trading strategies can be very safe and immune to global market crises, even when the entire market or sector falls. ",
];
const firstSection = document.querySelector("#first");
const secondSection = document.querySelector("#second");
const thirdSection = document.querySelector("#third");
const fourthSection = document.querySelector("#fourth");
pageLoaded = [false, false, false];

document.addEventListener(
  "scroll",
  function () {
    if (!pageLoaded[0] && isInViewport(secondSection)) {
      pageLoaded[0] = true;
      second();
    }
    if (!pageLoaded[1] && isInViewport(thirdSection)) {
      pageLoaded[1] = true;
      third();
    }
    if (!pageLoaded[2] && isInViewport(fourthSection)) {
      pageLoaded[2] = true;
      fourth();
    }
    if (
      isInViewport(secondSection) ||
      isInViewport(thirdSection) ||
      isInViewport(fourthSection)
    ) {
      document.getElementById("float-button").style.visibility = "visible";
    }
    if(isInViewport(firstSection)){
        document.getElementById('float-button').style.visibility = 'hidden'
    }
  },
  {
    passive: true,
  }
);

function isInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    // rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight + 100 || document.documentElement.clientHeight)
    // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

setTimeout(() => {
  title();
}, 0);

// let pages = [second, third, fourth];
// document.getElementById("down").addEventListener("click", () => {
//   document.getElementById("down").style.visibility = "hidden";
//   loadPages(0);
// });
// function loadPages(index) {
//   pages[index]();
//   setTimeout(() => loadPages(index + 1), 7000);
// }

async function loadText(text, screen, index, speed) {
  document.getElementById(screen).innerHTML += text.charAt(index);

  setTimeout(() => {
    loadText(text, screen, index + 1, speed);
  }, speed || 30);
}

async function title() {
  loadText(heading, "title", 0, 100);
}

async function second() {
  document
    .getElementById("second")
    .scrollIntoView({ block: "end", behavior: "smooth" });

  await loadText(ans[0], "what-ans", 0);
}

async function third() {
  document
    .getElementById("third")
    .scrollIntoView({ block: "end", behavior: "smooth" });

  loadText(ans[1], "how-ans", 0);
}

async function fourth() {
  document
    .getElementById("fourth")
    .scrollIntoView({ block: "end", behavior: "smooth" });

  loadText(ans[2], "why-ans", 0);
}
