import {supabase} from "../components/supabase";
import { __Visits__ } from "../pages/visits";

const contentContainer = document.querySelector("#app-content");

export async function __navBar__(){
    document.querySelector("#nav-visits").addEventListener('click', () => {
        __Visits__();
    })

    document.querySelector("#nav-admission").addEventListener('click', () => {
        contentContainer.innerHTML = "<h2>Under Construction</h2>";
    })

    document.querySelector("#nav-log-out").addEventListener('click', signOut)};

async function signOut(){
    const {error} = await supabase.auth.signOut();
    if(error){
        alert(error.message);
    } else {
        window.location.href = "/index.html";
    };
}