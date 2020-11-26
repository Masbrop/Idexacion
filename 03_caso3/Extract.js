(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("tr.ftlrow > td > div > div.ftllist > table > tbody > tr.ftlrow");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("div.staticcontentlinepanel > div > h3 > span > a").textContent.trim();
      	job.url = 'https://bombardier.taleo.net/careersection/jobdetail.ftl?job=' + elem.querySelector(" div.contentlinepanel > span.text:last-of-type").textContent.trim() + '&lang=en';
      	//job.url = 'https://bombardier.taleo.net/careersection/jobdetail.ftl?job=' + elem.querySelector("div.contentlinepanel > span.text:last-of-type").href.trim() + '&lang=en';
    	job.location = elem.querySelector("div.contentlinepanel > div.morelocation > span").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("span.jobFacility").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();