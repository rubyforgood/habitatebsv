import SiteData from './SiteData.js'

const JSONURL = 'https://spreadsheets.google.com/feeds/list/1nntWrfeSWDfaRAnRjz2CD6VGFnMeKJBYbDqm6i33lr0/od6/public/values?alt=json'

var alertBox = document.getElementById("alert");
const btn = document.getElementById("submit-button");
const loading = document.getElementById("loading");

SiteData(JSONURL).then(data => {
  var siteCodeInput = document.getElementById("site-id-input");
  btn.disabled = false;
  loading.classList.add("hide");
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    alertBox.classList.remove("visible");
    var site = data.find(item => item.code === siteCodeInput.value);
    if (site === undefined) {
      siteCodeInput.focus();
      setTimeout(function () {
        alertBox.classList.add("visible");
        window.scrollTo(0, 0);
      }, 50)
    } else {
      document.location = site.url;
    }
  });
});
