/**
 * Function to read from a google sheet list in this
 * format https://developers.google.com/gdata/docs/json
 * 
 * Example use:
 * ```
  import SiteData from './SiteData.js'
  
  const JSONURL = 'https://spreadsheets.google.com/feeds/list/1nntWrfeSWDfaRAnRjz2CD6VGFnMeKJBYbDqm6i33lr0/od6/public/values?alt=json'
  
  SiteData(JSONURL).then(data => {
    // have access to array of sites
    // in the form {code: String, url: String}
  })
 * ```
 *
 * @param {String} jsonURL URL of the json representation of the
 * google sheet (https://developers.google.com/gdata/samples/spreadsheet_sample)
 * 
 * @returns {Promise<Array>} a promise that resolves to an array of objects
 * that have a non-empty `code` and `url`.
 */
export default async function(jsonURL) {
  const raw = await _fetchSiteData(jsonURL)
  return _mungeSiteData(raw)
}

// ---- helper functions:

async function _fetchSiteData(jsonURL) {
  const res = await fetch(jsonURL)
  const rawSiteData = await res.json()
  return rawSiteData.feed.entry
}
  
function _mungeSiteData(rawSiteDataEntries) {
  return rawSiteDataEntries
    .map(_mungeSiteDataEntry)
    .filter(site => site.code && site.url) //remove empty
}

function _mungeSiteDataEntry(rawSite) {
  return {
    code: rawSite['gsx$sitecode']['$t'],
    url: rawSite['gsx$pre-filledurl']['$t']
  }
}
