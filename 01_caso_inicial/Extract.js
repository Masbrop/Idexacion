(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("table#searchresults > tbody > tr.data-row.clickable");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("a.jobTitle-link").textContent.trim();
    	job.url = elem.querySelector("a.jobTitle-link").href.trim();
    	job.location = elem.querySelector("span.jobLocation").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		job.source_salary = elem.querySelector("span.jobFacility").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();