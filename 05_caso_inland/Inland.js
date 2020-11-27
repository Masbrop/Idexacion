 //------------------------------------------------------------|
 // Before extract                                             |
 //------------------------------------------------------------|
 (function() {
     var out = {};

     var selector_jobs = "div.job-item.job-items-3.clearfix"; //1) Selector de los jobs 
     var selector_desc = "div.job-description"; //2) Selector de la descripción de los jobs

     if (typeof pass_it == "undefined") //EVALUA SI EL OBJETO pass_it ESTA DEFINIDO, SI NO LO ESTA LO DEFINE. 
         pass_it = {};

     if (!pass_it["cont"]) { //SI EL OBJETO pass_it CONTIENE CONTADOR ES PORQUE NO ESTA DEFINIDO ENTONCES ENTRA A LA CONDICION Y DEFINE TODO LOS ATRIBUTOS QUE VA A TENER EL CONTADOR LA VARIABLE SALIR
         out["pass_it"] = {
             "cont": 0,
             "salir": false,
             "selector_jobs": selector_jobs, //TENEMOS LOS ATRIBUTOS SELECTOR JOBS Y SELECTOR JOBS SE LLAMAN IGUAL QUE LAS VARIABLES QUE SE DEFINEN ARRIBA Y EN ELLOS  SE ALMACENA EL VALOR     
             "selector_desc": selector_desc
         };
     } else {
         out["pass_it"] = pass_it;
     }


     msg(document.querySelectorAll(out["pass_it"]["selector_jobs"]).length); // IMPRIME POR PANTALLA LA CANTIDAD DE ELEMENTOS DE ESE SELECTOR DE JOBS ESO ME DEVUELVE LA CANTIDAD DE JOBS QUE ESTA EN EL JOBSITE
     var elemento = out["pass_it"]["selector_jobs"]; //ALMACENA EN UNA VARIABLE EL SELECTOR DE LOS LOS JOBS
     var elem = document.querySelectorAll(elemento)[out["pass_it"]["cont"]]; // ME DEVUELVE TODO LO QUE CONTIENE EL SELECTOR YA SE  (TITLE LOCATION URL ETC)  DEL JOB Y ESTO LO ASIGNA A UN VALRIABLE ELEM

     if (elem) { //ESTA CONDICION VERIFICA QUE LA VARIABLE elem CONTENGA AL MENOS UN VALOR Y EN CASO DE SER VERDADERO PROCEDEMOS A ASIGNAR DICHOS SELECTORES A LAS VARIABLES DE pass_it RESPECTIVAMENTE CON SU TITULO,LOCALIZACION , ETC...

         out["pass_it"]["title"] = elem.querySelector("div.job-item-job-title").textContent.trim();
         out["pass_it"]["location"] = elem.querySelector("div.job-item-location").textContent.trim();


         elem.click() // DAMOS CLICK EN ESTE CASO A LA VARIABLE elem
         out.waitFor = out["pass_it"]["selector_desc"]; //SE COLOCA EN ESPERA POR LA DESCRIPCION


     } else { // SI LA VARIABLE elem NO CONTIENE UN VALOR SE VA POR ESTA RUTA Y LE ASIGNAMO AL ATRIBUTO SALIR EL VALOR DE true LO QUE INDICA QUE YA PUEDE SALIR DEL BEFORE Y IR AL EXTRACT

         msg("MENSAJE: NO HAY MAS TRABAJO ");
         out["pass_it"]["salir"] = true;
     }


     return out;
 })();


 //------------------------------------------------------------|
 // Extract                                                    |
 //------------------------------------------------------------|


 (function() {

     var out = {};
     var jobs = [];
     out["pass_it"] = pass_it; //LE asigna  el valor ya almacenado en el pass_it
     if (out["pass_it"]["salir"]) { //evalua el valor  pass_it,si  es verdadero entra y condiciona  y le asigna un titulo fictisio  a job title  e inserta ese job ficticio en el arreglo de trabajos jobs lo que hace aca es un job fantasma 
         var job = {};
         job.title = 'job fantasma';
         jobs.push(job);
     } else { // evalua si existe el selector de la description si existe nos dice que hay una description que ya cargo

         if (document.querySelector(out["pass_it"]["selector_desc"])) { // lo primero que hacemos es remover los selectores para limpieza de la description
             var job = {};
             var remove_selectors = ["a", "script", "style"];


             job.title = out["pass_it"]["title"];
             job.location = out["pass_it"]["location"];
             job.url = window.location.href;


             var full_html = document.querySelector(out["pass_it"]["selector_desc"]); //obtener el texto de la description y se almacena en la variable full html.
             // remove something from the jobdatata
             if (remove_selectors.length > 0) {
                 remove_selectors.forEach(remove_selector => { //  elimina los selectores a, imagenes y otras cosas que no deben estar en la description.
                     let salir
                     do {
                         salir = false;
                         if (full_html.querySelector(remove_selector)) {
                             full_html.querySelector(remove_selector).remove();
                             salir = true;
                         }
                     } while (salir);
                 });
             }

             job.html = full_html.innerHTML.trim().replace(/<[^>]*>?/g, ''); //devuelve el Html de la description y limpia tags
             job.jobdesc = full_html.textContent.trim().replace(/<[^>]*>?/g, '');


             job.html = cleanHTML(job.html); // limpia la description
             job.jobdesc = job.html;

             job.temp = 1;

             if (job.title.length > 0 && job.location.length > 0) {
                 jobs.push(job);
             }

         } else
             msg("IN ELSE");
     }

     out["jobs"] = jobs;
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



 //------------------------------------------------------------|
 // Paginacion                                                 |
 //------------------------------------------------------------|

 (function() {
     var out = {};

     out["pass_it"] = pass_it;
     out["pass_it"].cont += 1; // VEMOS QUE SI INCREMENTAMOS EL CONTADOR QUE ESTA EN EL OBJETO SE COLOCA EN 1 PARA ASI PASAR A LA SIGUIENTE PAGINA



     window.history.back(); // NOS DEVUELVE A LA DESCRIPTION ORIGINAL

     if (out["pass_it"]["salir"]) //SI ES FALSO SIGUE LA PAGINATION, SI ES VERDADERO DETIENE LA PAGINATION... SI SIGUE PAGINANDO EL REGRESA AL EXTRAC EL AGREGA EL TITULO LLAMADO jobs fantasma PARA QUE ASI NO //DE EROOR
         out["has_next_page"] = false;
     else
         out["has_next_page"] = true;

     out.waitFor = out["pass_it"]["selector_jobs"];
     //out["wait"] = true;
     return out;
 })();