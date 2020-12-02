//------------------------------------------------------------|
// Before Extrac                                              |
//------------------------------------------------------------|

(function(){
    var out = {};
    try{
    var element = document.querySelector("pre").textContent;
    //msg(element);
    var json = JSON.parse(element);
    var jobs = json.body.children[0].children[0].listItems;
    out["json"] = jobs;
    }catch(error){
    out["wait"] = 500;
    }
    return out;
    })();

//------------------------------------------------------------|
// Extract                                                    |
//------------------------------------------------------------|

(function() {
    var out = {};
    // var html_jobs = document.querySelectorAll("");
    //  This gives you an HTMLElement object
  
    if(typeof pass_it == "undefined") pass_it = {};
    msg("***************************************");
    //msg(pass_it);
    //msg(window.location.href);
    msg("***************************************");
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 50,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
  
    //var element = document.querySelector("pre").textContent;
    //msg(element);
    var jobs =  pass_it["json"];
  
    var returnedJobs = [];    
    if(!jobs){
      var element = document.querySelector("pre").textContent;
      //msg(element);
      var json = JSON.parse(element);
      var jobs = json.body.children[0].children[0].listItems;
    }
    //msg(typeof(jobs));
    for(i in jobs) {
      var job = {};/*init*/
      // msg("Entre")
      var urljob = 'https://gianttiger.wd3.myworkdayjobs.com/gianttiger/';
  
      job.title = jobs[i].title.instances[0].text;
        //job.title = job.title.split("(").shift();
      job.url =  urljob + jobs[i].title.commandLink;
      job.location = jobs[i].subtitles[0].instances[0].text.split("-").reverse().join(", ");
      job.location = job.location;
  
  
  
      job.temp = 5;
      returnedJobs.push(job);
  
    }
    //msg(jobs);
    //msg(returnedJobs.length);
  
    out["pass_it"]["jobs"] = returnedJobs.length;
    out["jobs"]= returnedJobs;
    return out;
  })();

//------------------------------------------------------------|
// Pagination                                                 |
//------------------------------------------------------------|

(function() {
    var out = {};
    if(typeof pass_it == "undefined") pass_it = {};
    if(typeof msg == "undefined") msg = function(x){return x;};
  
    if (!pass_it["cont"]) {
      out["pass_it"] = {
        "cont": 0,
        "jobs": 0
      };
    } else {
      out["pass_it"] = pass_it;
    }
    if (out["pass_it"]["jobs"] === 50) {
      //url, cambia según el JSON
      var url = "https://gianttiger.wd3.myworkdayjobs.com/gianttiger/fs/searchPagination/318c8bb6f553100021d223d9780d30be/" + out["pass_it"].cont + "?clientRequestID=97937d71cccb4992acda3a791b29a897";
      out["pass_it"].cont += 50;
      window.location.href = url;
      out["has_next_page"] = true;
    } else {
      out["has_next_page"] = false;
    }
  
    return out;
  })();

//------------------------------------------------------------|
// Jobdescription                                             |
//------------------------------------------------------------|

  (function() {
    var out = {};
    var job = {};
    var jobid = pass_it["job"].url.split("&r=").pop().split('#').shift();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/115407/search/" + jobid + "?rl=enU";
    //5000547841706#/S";
    msg(endpoint);
    $.ajax({
      url: endpoint,
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      type: 'GET',
      async: false,
      success: function (result) {
        var full_html = "";
  
        for (var i = 0; i < result.fields.length; i++) {
          // Ignorar las dos primeras posiciones porque son como basura...
          if (i >= 3) {
            full_html += "<br/>";
            full_html += "<h3>" + result.fields[i].label + "</h3><br/>" + result.fields[i].content;
          }
        }
        
        for (var i = 0; i < result.fields.length; i++) 
        {
          // Ignorar las dos primeras posiciones porque son como basura...
          if (result.fields[i].label == "Company") 
          {                       
            job.source_empname = result.fields[i].content;
          }
        }
        job.html      = full_html;
        job.html = removeTextBefore(job.html, "General Summary", false);
        job.html = removeTextBefore(job.html, "PURPOSE:", false);
        job.html = removeTextAfter(job.html, "How to Apply", true);
        job.html = removeTextAfter(job.html, "Diversity is fundamental at Safeway", true);
        job.html = removeTextAfter(job.html, "Locally great and nationally strong, Albertsons Companies (NYSE: ACI)", true);
        
        job.html      = cleanHTML(job.html);
        
        var tmp       = document.createElement('div');      
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc); 
        if(job.jobdesc.length < 100){
          job.dateclosed_raw='27/11/2020';
        }     
      },
      error: function (error) {
        msg(error);
      }
    });
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