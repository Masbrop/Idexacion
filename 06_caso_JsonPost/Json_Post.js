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