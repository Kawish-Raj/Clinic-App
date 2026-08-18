import { supabase } from "../components/supabase";
import { tableComp } from "../components/table";

const contentContainer = document.querySelector("#app-content");
const PATIENT_TABLE_HEADINGS = ["Case No","First Name","Last Name","Mobile Number","Age","Husband/Father"];
const PATIENT_TABLE_KEYS = ["case_no","first_name","last_name","mobile_number","age","address","husband_father"];

let cachedData = null;

export async function renderVisits(){
    // contentContainer.innerHTML = `<div id="patient-visit-table"></div>`
    await displayTodayPatient();
    
};

async function displayTodayPatient(){
    
    if (cachedData == null) {
        contentContainer.innerHTML = "<h2>Loding...</h2>";
        const { data: freshData, error } = await supabase.from('patients').select();

        if (error) {
            console.log(error);
            contentContainer.innerHTML = "<p>Error loading data.</p>";
            return;
        }

        if (!freshData || freshData.length === 0) {
            contentContainer.innerHTML = "<p>No patients found.</p>";
            return;
        }

        cachedData = freshData;
    }
    
    

    console.log(cachedData);
    // Use backticks `` and target a specific column property (e.g., .name)
    contentContainer.innerHTML = tableComp(cachedData,PATIENT_TABLE_HEADINGS,PATIENT_TABLE_KEYS);
}

