import { supabase } from "../components/supabase";
import { tableComp } from "../components/table";

const contentContainer = document.querySelector("#app-content");
const PATIENT_TABLE_HEADINGS = ["Case No","First Name","Last Name","Mobile Number","Age","Husband/Father"];
const PATIENT_TABLE_KEYS = ["case_no","first_name","last_name","mobile_number","age","address","husband_father"];

const patientTableContainer = document.createElement("div");
patientTableContainer.id = "patient-visit-table";

let cachedData = null;

export async function renderVisits(){
    contentContainer.replaceChildren();
    contentContainer.append(patientTableContainer);
    await displayTodayPatient();
    
};

async function displayTodayPatient(){
    
    if (cachedData == null) {
        patientTableContainer.innerHTML = "<h2>Loding...</h2>";
        const { data: freshData, error } = await supabase.from('patients').select();

        if (error) {
            console.log(error);
            patientTableContainer.innerHTML = "<p>Error loading data.</p>";
            return;
        }

        if (!freshData || freshData.length === 0) {
            patientTableContainer.innerHTML = "<p>No patients found.</p>";
            return;
        }

        cachedData = freshData;
    }
    
    

    patientTableContainer.innerHTML = tableComp(cachedData,PATIENT_TABLE_HEADINGS,PATIENT_TABLE_KEYS);
}

