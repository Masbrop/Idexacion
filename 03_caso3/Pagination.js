(function() {
    var out = {};
    var next_page_selector = "a[title='Go to the next page'][aria-disabled='false']"; //selector to identify the next button 
    //Identifica donde se encuentra el boton con sus atributos para identificarlo e identifica el estado en el que se quiere que que de click
    //En este caso mientras aria-disable = false el boton se seguira oprimiendo
    var last_page_selector = "a[title='Go to the next page'][aria-disabled='true']"; //selector to identify the last page
    //Cuando llegue a aria-disable = true el boton dejara de oprimirse
    //Esta caracteristica la logramos identificar cuando vamos a la ultima pagina y el boton nos muestra a que estado se cambia
    
    var clickable_elem = document.querySelector(next_page_selector);
  
    //stop condition
    if (document.querySelector(last_page_selector)) {
        //last page
        out["has_next_page"] = false;
    } else if(clickable_elem){
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        //try again
        out["has_next_page"] = true;
    }
    //out.waitFor = "tbody.jobsbody > tr";
    return out;
})();