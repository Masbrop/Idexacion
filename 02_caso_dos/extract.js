(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("#job_results_list_hldr > div.job_list_row");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("div.jlr_title > p > a.job_link").textContent.trim();
    	job.url = elem.querySelector("div.jlr_title > p > a.job_link").href.trim();
    	job.location = elem.querySelector("div.jlr_title > p.jlr_cat_loc > span.location").textContent.trim();
        //job.dateposted_raw = elem.querySelector("").textContent.trim();
        //job.logo = elem.querySelector("").getAttribute("src").trim();
		//job.source_apply_email = elem.querySelector("").textContent.trim();
		//job.source_empname = elem.querySelector("").textContent.trim();
		//job.source_jobtype = elem.querySelector("").textContent.trim();
		//job.source_salary = elem.querySelector("").textContent.trim();
       	job.temp = 1;
    	jobs.push(job);
  	} 
  
	out["jobs"]= jobs;
  	return out;
})();