import SiteData from './SiteData.js'

const JSONURL = 'https://spreadsheets.google.com/feeds/list/1nntWrfeSWDfaRAnRjz2CD6VGFnMeKJBYbDqm6i33lr0/od6/public/values?alt=json'

SiteData(JSONURL).then(data => {
  //enable button
    var btn = document.getElementById("submit-button");
    var siteCode = document.getElementById("site-id-input");

    btn.addEventListener("click", function(e){
        e.preventDefault();
      var site = data.find(item=>item.code==siteCode.value)
        if (site == undefined){
          alert('Site code not found!');
        } else {
          document.location = site.url;
        }
    });
})
