/**
 * 
 * @param {String} jsonURL URL of the json representation of the google sheet: 
 */
export default async function(jsonURL) {
  const raw = await fetchSiteData(jsonURL)
  return mungeSiteData(raw)
}

async function fetchSiteData(jsonURL) {
  const res = await fetch(jsonURL)
  const rawSiteData = await res.json()
  return rawSiteData.feed.entry
}
  
function mungeSiteData(rawSiteDataEntries) {
  return rawSiteDataEntries.map(rawSiteDataEntry =>
    ({
      code: rawSiteDataEntry['gsx$sitecode']['$t'],
      url: rawSiteDataEntry['gsx$pre-filledurl']['$t']
    })
  ).filter(site => site.code && site.url) //remove empty
}
