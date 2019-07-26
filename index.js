import SiteData from './SiteData.js'

const JSONURL = 'https://spreadsheets.google.com/feeds/list/1nntWrfeSWDfaRAnRjz2CD6VGFnMeKJBYbDqm6i33lr0/od6/public/values?alt=json'

SiteData(JSONURL).then(data => {
  //enable button
  console.log(data) 
    var btn = document.getElementById("submit-button");
    var siteCode = document.getElementById("site-id-input");
    var redirectUrl = "";

    btn.addEventListener("click", function(e){
        e.preventDefault();
        var match = false;
        
        for (var key in data) {
           if (data[key].code === siteCode.value) {
              match = true
              redirectUrl = data[key].url
           } 
        }         
        if (match == true) {
          document.location = redirectUrl;
        } else{
            alert('Site code not found!');
        }
    });
})
