async function fetchSiteData(jsonURL) {
    const res = await fetch(jsonURL)
    const rawSiteData = await res.json()
    return rawSiteData.feed.entry
}
  
function mungeSiteData(rawSiteDataEntries) {
    return rawSiteDataEntries.map(rawSiteDataEntry =>
        ({
        code: rawSiteDataEntry['gsx$sitecode']['$t'],
        url: rawSiteDataEntry[`gsx$pre-filledurl`]['$t']
        })
    ).filter(site => site.code && site.url) //remove empty
}

export default async function(jsonURL) {
    const raw = await fetchSiteData(jsonURL)
    return mungeSiteData(raw)
}