import {supabase} from "./supabase";
import { renderVisits } from "../pages/visits";

const contentContainer = document.querySelector("#app-content");

export async function initNavBarComp(){
    document.querySelector("#nav-visits").addEventListener('click', () => {
        renderVisits();
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