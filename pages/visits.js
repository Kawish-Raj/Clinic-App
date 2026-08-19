import { supabase } from "../components/supabase";
import { tableComp } from "../components/table";
import { formComp } from "../components/registrationCard";

const PATIENT_TABLE_HEADINGS = ["Case No", "First Name", "Last Name", "Mobile Number", "Age", "Address", "Husband/Father"];
const PATIENT_TABLE_KEYS = ["case_no", "first_name", "last_name", "mobile_number", "age", "address", "husband_father"];
const PATIENT_FIELDS = [
    { id: "first_name", label: "First Name", type: "text", required: true },
    { id: "last_name", label: "Last Name", type: "text", required: true },
    { id: "mobile_number", label: "Mobile Number", type: "number", required: true, errorMsg: "Invalid Mobile Number" },
    { id: "age", label: "Age", type: "number", required: true, errorMsg: "Invalid Age" },
    { id: "address", label: "Address", type: "text", required: true },
    { id: "husband_father", label: "Husband/Father", type: "text", required: true }
];
const VALIDATION_FIELDS = ["age", "mobile_number"];

const contentContainer = document.querySelector("#app-content");
const registrationCardContainer = document.createElement("div");
registrationCardContainer.id = "registration-card-container";
const registrationForm = document.createElement("div");
registrationForm.id = "registration-form-container";
registrationForm.innerHTML = formComp(PATIENT_FIELDS, "registration");

const patientTableContainer = document.createElement("div");
patientTableContainer.id = "patient-visit-table";

let cachedData = null;
let tableJustUpdated = false;

registrationForm.querySelector('form').addEventListener('submit', async (e) => await handleLoginFormSubmission(e));

async function renderVisits() {
    contentContainer.replaceChildren();
    contentContainer.append(registrationCardContainer, patientTableContainer);
    displayRegistrationCard();
    await displayTodayPatient();
};



function displayRegistrationCard() {
    registrationCardContainer.append(registrationForm);
}


async function displayTodayPatient() {

    if (cachedData == null || tableJustUpdated) {
        if (!tableJustUpdated) { patientTableContainer.innerHTML = "<h2>Loding...</h2>"; };
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



    patientTableContainer.innerHTML = tableComp(cachedData, PATIENT_TABLE_HEADINGS, PATIENT_FIELDS, true, PATIENT_TABLE_KEYS[0]);
}

async function handleLoginFormSubmission(e) {
    e.preventDefault();
    let status = validateRegistration();
    if (status) {
        const payload = {};

        PATIENT_FIELDS.forEach((field, index) => {
            payload[field.id] = registrationForm.querySelector(`#${field.id}`).value;
        });
        console.log(payload);
        const { error } = await supabase.from('patients').insert(payload);
        if (error) {
            alert(error.message);
        } else {
            tableJustUpdated = true;
            await displayTodayPatient();
        }
    }
    // const [status,values]=formValidation();
    // if(status){
    //     const {error} = await supabase.from('patients').insert({
    //         first_name:values[0],
    //         last_name:values[1],
    //         mobile_number:values[2],
    //         age:values[3],
    //         address:values[4],
    //         husband_father:values[5]
    //     })
    //     if(error){
    //         console.log(values);
    //         alert(error.message);
    //     } else{
    //         tableJustUpdated = true;
    //         await displayTodayPatient();
    //     }
    // }
}

function validateRegistration() {
    let validationStatus = true;
    const age = registrationForm.querySelector('#' + VALIDATION_FIELDS[0]);
    const mobileNumber = registrationForm.querySelector('#' + VALIDATION_FIELDS[1]);

    const ageErrorMessage = registrationForm.querySelector('#' + VALIDATION_FIELDS[0] + '-error');
    const mobileErrorMessage = registrationForm.querySelector('#' + VALIDATION_FIELDS[1] + '-error');

    if (age.value < 1 || age.value > 99) {
        ageErrorMessage.innerText = "Age needs to be between 0 and 100";
        ageErrorMessage.style.display = "block";
        validationStatus = false;
    } else {
        ageErrorMessage.style.display = "none";
    }

    if (mobileNumber.value < 0) {
        mobileErrorMessage.innerText = "Mobile Number cannot be a negative value";
        mobileErrorMessage.style.display = "block";
        validationStatus = false;
    } else if (mobileNumber.value > 9999999999 || mobileNumber.value < 1000000000) {
        mobileErrorMessage.innerText = "Mobile Number needs to be 10 digits";
        mobileErrorMessage.style.display = "block";
        validationStatus = false;
    } else {
        mobileErrorMessage.style.display = "none";
    }

    return validationStatus;
}

export { renderVisits, registrationCardContainer };

