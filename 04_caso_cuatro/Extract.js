(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.jlc-mainList > ul > li");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
      	var titles = elem.querySelector("a > div.section-jobTitle").textContent.trim();
        var locations = elem.querySelector("a > div.section-location").textContent.trim();
      	var datesposted = elem.querySelector("a > div:last-of-type").textContent.trim();
      	
    	job.title = titles.replace('Job title', '');
      	job.url = elem.querySelector("ul.jlc-m-listing > li > a").href.trim();
    	job.location = locations.replace('Location', '');
      	job.dateposted_raw = datesposted.replace('Publication', '').trim();;
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
		   job.temp = 1;
		   
      	if(titles != "Spontaneous"){
          jobs.push(job);
        }
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();