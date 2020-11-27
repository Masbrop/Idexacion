//------------------------------------------------------------|
// Extract                                                    |
//------------------------------------------------------------|

 (function() {
    var jobs = [];
    var out = {};
    var counter = 1;
    var limit = 0;
    var json;
    do {
      var data = {"filters":[{"name":"country","label":""},{"name":"state","label":""},{"name":"grp","label":"Job Type"},{"name":"ptitle","label":"Job"}],"results":{"pageTitle":"Search Results","zeroResultsMessage":"We're sorry but we have no job openings at this time that match your search criteria. Please try another search.","searchFailureMessage":"Oops! Something went wrong.  Search has encountered a problem. Try searching again","resultsFoundLabel":"results found","bookmarkText":"Bookmark This","pageSize":"100","sortOrder":"00001000","shareText":"Share","fields":[{"name":"ptitle","label":"Published Job Title"},{"name":"grp","label":"Interest Area"}]},"pagefilter":{"page":counter},"rl":"enUS"} ;
      $.ajax({
        url : 'https://recruiting.adp.com/srccar/public/rest/1/115407/search/',
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        type : 'POST',
        data : JSON.stringify(data),
        dataType: "json",
        async : false,
        success : function(result){
          json = result.jobs;
          limit = result.pages; //Se debe verificar hasta donde llega la paginacion para no sacar jobs repetidos
          for(var i = 0; i<json.length; i++) {
            var job = {};
            var elem = json[i];
            job.id=elem.id;
            job.title = elem.ptitle;
            job.location = elem.locationCity + " " + elem.locationState ;
            job.url = elem.url;                    
            //job.dateposted_raw = elem.positionOfDatePosted;
            //job.dateclosed_raw = elem.positionOfDateClosed;
            //job.source_jobtype = elem.positionOfJobtype;
            //job.source_salary = elem.positionOfSalary;         
            //job.source_empname = elem.positionOfEmpname;
            //job.logo = elem.positionOfLogo;
            //job.source_apply_email = elem.positionOfEmail;
            
  
            job.temp = "1";
            jobs.push(job);
          }
          counter = counter + 1;
        },
        error: function(error){
          msg(error);
        }
      });
    } while (counter < limit);
  
    out["jobs"]= jobs;
    return out;
  })();

//------------------------------------------------------------|
// Jobdescription                                             |
//------------------------------------------------------------|

(function() {
    var out = {};
    var job = {};
    var jobid = pass_it["job"].url.split("&r=").pop().split('#').shift();
    var endpoint = "https://recruiting.adp.com/srccar/public/rest/1/115407/job/" + jobid + "?rl=en"; //Se contruye la URL manualmente
    
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
        job.html = removeTextAfter(job.html, "Secondary Locations", true);
        
        job.html      = cleanHTML(job.html);
        
        var tmp       = document.createElement('div');      
        tmp.innerHTML = job.html;
        job.jobdesc   = tmp.textContent.trim();
        job.jobdesc   = cleanHTML(job.jobdesc); 
        if(job.jobdesc.length < 100){
          job.dateclosed_raw='01/01/2012';
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
