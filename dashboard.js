import {supabase} from "./components/supabase";
import { __navBar__ } from "./sections/navbar";

async function __Dashboard__(){
    const {data:{session}} = await supabase.auth.getSession();
    if(!session){
        window.location.href = "/index.html";
        return;
    }
    document.body.style.display = "block";
    await __navBar__();
};

__Dashboard__();

// Detect if the page was loaded from the browser's Back/Forward cache
window.addEventListener('pageshow', (event) => {
    // event.persisted is true if the page is restored from cache
    if (event.persisted) {
        // Force the browser to reload the page from scratch. 
        // This makes the page hide the body and re-run __Dashboard__()
        document.body.style.display = "none";
        window.location.reload();
    }
});