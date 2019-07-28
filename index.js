import SiteData from './SiteData.js'

const JSONURL = 'https://spreadsheets.google.com/feeds/list/1nntWrfeSWDfaRAnRjz2CD6VGFnMeKJBYbDqm6i33lr0/od6/public/values?alt=json'

export function hideLoader() {
  const loading = document.querySelector(".loading");
  loading.classList.add("hide");
}

export function redirectTo(location) {
  document.location = location;
}

export function findSiteFromInput(data, input) {
  return data.find(item => item.code === input.value);
}

function handleSiteNotFound(input, alert) {
  input.focus();
  setTimeout(function () {
    alert.classList.add("visible");
    window.scrollTo(0, 0);
  }, 50)
}

export function handleClickButton(e, data, redirect) {
  e.preventDefault();

  const alert = document.querySelector(".alert");
  alert.classList.remove("visible");

  const siteCodeInput = document.getElementById("site-code-input");
  const site = findSiteFromInput(data, siteCodeInput);

  if (site === undefined) {
    handleSiteNotFound(siteCodeInput, alert)
  } else {
    redirect(site.url);
  }
}

SiteData(JSONURL).then(data => {
  const btn = document.getElementById("submit-button");
  btn.disabled = false;
  hideLoader();
  btn.addEventListener("click", function (e) {
    handleClickButton(e, data, redirectTo);
  });
});
