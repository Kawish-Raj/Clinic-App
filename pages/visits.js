import { supabase } from "../components/supabase";
import { tableComp } from "../components/table";
import {formComp } from "../components/registrationCard";

const PATIENT_TABLE_HEADINGS = ["Case No","First Name","Last Name","Mobile Number","Age","Address","Husband/Father"];
const PATIENT_TABLE_KEYS = ["case_no","first_name","last_name","mobile_number","age","address","husband_father"];
const PATIENT_FIELDS = [
    { id: "first-name", label: "First Name", type: "text", required: true },
    { id: "last-name", label: "Last Name", type: "text", required: true },
    { id: "mobile-number", label: "Mobile Number", type: "number", required: true, errorMsg: "Invalid Mobile Number" },
    { id: "age", label: "Age", type: "number", required: true, errorMsg: "Invalid Age" },
    { id: "address", label: "Address", type: "text", required: true },
    { id: "husband-father", label: "Husband/Father", type: "text", required: true }
];

const contentContainer = document.querySelector("#app-content");
const registrationCardContainer = document.createElement("div");
registrationCardContainer.id = "registration-card-container";
const resgistrationForm = registrationCardContainer.querySelector("#registration-form");
const patientTableContainer = document.createElement("div");
patientTableContainer.id = "patient-visit-table";

let cachedData = null;
let tableJustUpdated = false;

async function renderVisits(){
    contentContainer.replaceChildren();
    contentContainer.append(registrationCardContainer,patientTableContainer);
    displayRegistrationCard();
    await displayTodayPatient();
};



function displayRegistrationCard(){
    registrationCardContainer.innerHTML=formComp(PATIENT_FIELDS,"registration");
    // resgistrationForm.addEventListener('submit',async (e)=>{
    //     e.preventDefault();
    //     const [status,values]=formValidation();
    //     if(status){
    //         const {error} = await supabase.from('patients').insert({
    //             first_name:values[0],
    //             last_name:values[1],
    //             mobile_number:values[2],
    //             age:values[3],
    //             address:values[4],
    //             husband_father:values[5]
    //         })
    //         if(error){
    //             console.log(values);
    //             alert(error.message);
    //         } else{
    //             tableJustUpdated = true;
    //             await displayTodayPatient();
    //         }
    //     }
    // })
}


async function displayTodayPatient(){
    
    if (cachedData == null || tableJustUpdated) {
        if(!tableJustUpdated){patientTableContainer.innerHTML = "<h2>Loding...</h2>";};
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
        tableJustUpdated = false;
    }
    
    

    patientTableContainer.innerHTML = tableComp(cachedData,PATIENT_TABLE_HEADINGS,PATIENT_TABLE_KEYS,true,PATIENT_TABLE_KEYS[0]);
}

export {renderVisits,registrationCardContainer};

