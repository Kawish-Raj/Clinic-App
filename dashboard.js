import {supabase} from "./components/supabase";
import { initNavBarComp } from "./components/navbar";

async function initDashboard(){
    const {data:{session}} = await supabase.auth.getSession();
    if(!session){
        window.location.href = "/index.html";
        return;
    }
    document.body.style.display = "block";
    await initNavBarComp();
};

initDashboard();