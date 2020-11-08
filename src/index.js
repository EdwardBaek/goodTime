import './assets/styles/index.css';
import 'font-awesome/css/font-awesome.min.css';
const browserListArray = ["MSIE", "Firefox", "Safari", "Chrome", "Opera", "Edge", ];
const supportVersion = [0, 60, 11, 56, 9999, 17];
function getClientBrowserInfo (browserListArray) {
  let sUsrAg = navigator.userAgent, nIdx = browserListArray.length - 1;
  for (nIdx; nIdx > -1 && sUsrAg.indexOf(browserListArray[nIdx]) === -1; nIdx--);
  const browserName = browserListArray[nIdx];
  let browserVersion = browserName !== undefined ? sUsrAg.split(browserName)[1].split(" ")[0].substr(1) : "";
  if( sUsrAg.indexOf("Version") > -1 ) {
    browserVersion = sUsrAg.split("Version")[1].split(" ")[0].substr(1);
  }
  return {
    browserName: browserName,
    browserVersion: browserVersion,
    index: nIdx
  };
}
function isSupportedBrowser(browserInfo) {
  let browerVersion = parseInt(browserInfo.browserVersion.split(".")[0])
  return supportVersion[browserInfo.index] <= browerVersion; 
}

let browserInfo = getClientBrowserInfo(browserListArray);

function hrefPage() {
  location.href = "./main.html";
  // setMovePage();
}

let time = 15;
function setMovePage() {
  let eCount = document.getElementById("count");
  let id = setInterval(countFn, 1000);

  function countFn() {
    time--;
    eCount.innerHTML = time;
    if( time <= 0 ) {
      clearInterval(id);
      hrefPage();
    } 
  }
}

function alertUserAgent() {
  let url = new URL(window.location.href);
  let test = url.searchParams.get("test");
  console.log("test", test);
  if( test ) {
    alert(navigator.userAgent);
  }
}

alertUserAgent();

if (isSupportedBrowser(browserInfo)) {
  hrefPage();
} else {
  document.addEventListener("DOMContentLoaded", ()=> {
    setMovePage();
  });
}