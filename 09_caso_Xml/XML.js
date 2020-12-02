$city = trim((string) $j->location);
//$state = trim((string) $j->state);
$country = trim((string) $j->country);
    
$arrloc=array();
if($city) $arrloc[] = $city;
//if($state) $arrloc[] = $state;
if($country) $arrloc[] = $country;
$loc = implode(", ", $arrloc);

$job=array();

$job['title'] = (String) $j->title; 
$job['url'] = (String) $j->url;
$job['location'] = $loc; 

$job['jobid'] = (String) $j->jobnumber; 
$job['source_jobtype'] = (String) $j->workingTime;
//$job['dateposted_raw'] = (String) $j->date;
$job['source_empname'] = (String) $j->company;

$job['html']  = html_entity_decode((String) $j->description);
$job['jobdesc'] = strip_tags($job["html"]);

$job['temp']=1;