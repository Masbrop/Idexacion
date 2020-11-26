(function() {
  var out = {};
  var job = {};
  var selector = "div.editablesection";
  var remove_selectors = ["a","script","style","iframe","img","button", 'div[id="requisitionDescriptionInterface.ID1530.row1"]'];
  //Remove selectors puede elimiar cualquier elemento el cual tengamos una id o clase identificada como en el div de arriba de ejemplo
  //Con ese div eliminamos una caja de texto cuando el remove no nos funciona debido a la identificacion de patrones
  //var job = pass_it["job"];
  var full_html = document.querySelector(selector);
  // remove something from the jobdatata
  if (remove_selectors.length > 0) remove_selectors.forEach(remove_selector => {if(full_html.querySelector(remove_selector)) full_html.querySelector(remove_selector).remove();});
  if (typeof cleanHTML == "undefined") cleanHTML = function(x){return x};
  if (typeof msg == "undefined") msg = console.log;

  job.html      = full_html.innerHTML.trim();    
  //job.html = job.html.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, "")
  //job.html = removeTextBefore(job.html, 'Description', false);
  job.html = removeTextAfter(job.html, 'Job', true);
  job.html = removeTextAfter(job.html, 'Environmental Conditions', true);
  job.html      = cleanHTML(job.html);
  var tmp       = document.createElement('div');
  tmp.innerHTML = job.html;
  job.jobdesc   = tmp.textContent.trim();
  job.jobdesc   = cleanHTML(job.jobdesc);
  out["job"] = job;
  return out;

})();
function removeTextBefore(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).pop();
    if (!flag) {
      newHtml = "<h3>" + text + "</h3>" + newHtml;
    }       
  }
  return newHtml;
}
function removeTextAfter(html, text, flag) {
  var newHtml = html;
  if (newHtml.indexOf(text) > -1) {
    newHtml = newHtml.split(text).shift();
    if (!flag) {
      newHtml = newHtml + "<p>" + text + "</p>";
    }       
  }
  return newHtml;
}