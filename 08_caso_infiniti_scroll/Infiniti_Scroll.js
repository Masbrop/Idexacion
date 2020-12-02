//------------------------------------------------------------|
// Extract                                                    |
//------------------------------------------------------------|
(function() {
	var out = {};
     var html_jobs = document.querySelectorAll("div.oracletaleocwsv2-accordion-head");
  	var jobs = [];for(var x in html_jobs){
    	if(typeof html_jobs[x] =="function") continue;
      	if(typeof html_jobs[x] =="number") continue;
    	var job = {};
    	var elem = html_jobs[x];
    	job.title = elem.querySelector("h4.oracletaleocwsv2-head-title > a").textContent.trim();
    	job.url = elem.querySelector("h4.oracletaleocwsv2-head-title > a").href.trim();
    	job.location = elem.querySelector("div.oracletaleocwsv2-accordion-head-info > div").textContent.trim();
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

//------------------------------------------------------------|
// InfinitePagination se repite segun el tamaño de la pagina  |
//------------------------------------------------------------|

(function(){
	var out = {};
	if(typeof pass_it == "undefined") pass_it = {};
	if(typeof msg == "undefined") msg = console.log;
	
	if(!pass_it["jobs"]){
	  out["pass_it"] = {
		"jobs" : 0
	  };
	}else{
		out["pass_it"] = pass_it;
	}
	  out["has_next_page"] = true;  
		document.querySelector('html').scrollBy(0,document.querySelector('html').scrollHeight);
	
	
	
		var jobs = document.querySelector('html').scrollHeight;	
	  //msg (out["pass_it"].jobs + " -- " + jobs) //muestra un mensaje
	
		if(out["pass_it"].jobs == jobs){
				out["has_next_page"] = false;
		}
	
	  out["pass_it"].jobs = jobs;
  
		out.wait = true;
		out.waitFor = 'div.oracletaleocwsv2-accordion-head';
		out.pic = true;
		out.html = true;
	  return out;
  })();

//------------------------------------------------------------|
// InfinitePagination se repite segun la cantida de jobs      |
//------------------------------------------------------------|

(function(){
	var out = {};
	  var jobs = document.querySelectorAll('div.oracletaleocwsv2-accordion').length;
	
	if(typeof pass_it == "undefined") pass_it = {};
	if(typeof msg == "undefined") msg = console.log;
	
	if(!pass_it["jobs"]){
	out["pass_it"] = {
		"jobs" : 0
	};
	}else{
		out["pass_it"] = pass_it;
	}
	out["has_next_page"] = true;  
		
	//msg (out["pass_it"].jobs + " -- " + jobs) //muestra un mensaje
	  document.querySelector('html').scrollBy(0,document.querySelector('html').scrollHeight);
	
	if(out["pass_it"].jobs == jobs){
		out["has_next_page"] = false;
		}
	
	out["pass_it"].jobs = jobs;

		out.wait = true;
		out.waitFor = 'div.oracletaleocwsv2-accordion-head';
		out.pic = true;
		out.html = true;
	return out;
})();