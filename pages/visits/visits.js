// import { supabase } from "../../database_helpers/supabase";
// import { TABLE_COMP } from "../../components/table";
// import  FORM_COMP  from "../../components/registrationCard";
import __registrationForm__ from "./sections/registrationForm";
// import { UNIQUE_IDENTIFIER, PATIENT_FIELDS, PATIENT_TABLE_HEADINGS, state } from "./helpers";
import __todayPatient__ from "./sections/todayPatient";
// const VALIDATION_FIELDS = ["age", "mobile_number"];

// const registrationFormContainer = document.createElement("div");
// registrationFormContainer.id = "registration-card-container";
// const registrationForm = document.createElement("div");
// registrationForm.id = "registration-form-container";
// registrationForm.innerHTML = FORM_COMP(PATIENT_FIELDS, "registration");

// const patientTableContainer = document.createElement("div");
// patientTableContainer.id = "patient-visit-table";

// let cachedData = null;
// let state.tableJustUpdated = false;

// registrationForm.querySelector('form').addEventListener('submit', async (e) => await handleLoginFormSubmission(e));
// Listen for clicks anywhere inside the patient table container
// patientTableContainer.addEventListener('click', async (e) => await handleDeleteRow(e));


async function __Visits__(contentContainer) {
    contentContainer.replaceChildren();
    // displayRegistrationCard();
    __registrationForm__(contentContainer);
    await __todayPatient__(contentContainer);
    // contentContainer.append(patientTableContainer);
    // await displayTodayPatient();
};



// function displayRegistrationCard() {
//     registrationCardContainer.append(registrationForm);
// }


// async function displayTodayPatient() {

//     if (cachedData == null || state.tableJustUpdated) {
//         if (!state.tableJustUpdated) { patientTableContainer.innerHTML = "<h2>Loding...</h2>"; };
//         const { data: freshData, error } = await supabase.from('patients').select();

//         if (error) {
//             console.log(error);
//             patientTableContainer.innerHTML = "<p>Error loading data.</p>";
//             return;
//         }

//         if (!freshData || freshData.length === 0) {
//             patientTableContainer.innerHTML = "<p>No patients found.</p>";
//             return;
//         }

//         cachedData = freshData;
//         state.tableJustUpdated = false;
//     }



//     patientTableContainer.innerHTML = TABLE_COMP(cachedData, PATIENT_TABLE_HEADINGS, PATIENT_FIELDS, true, UNIQUE_IDENTIFIER);
// }

// async function handleLoginFormSubmission(e) {
//     e.preventDefault();
//     let status = validateRegistration();
//     if (status) {
//         const payload = {};

//         PATIENT_FIELDS.forEach((field, index) => {
//             if(field.id != UNIQUE_IDENTIFIER){
//                 payload[field.id] = registrationForm.querySelector(`#${field.id}`).value;
//             }    
//         });
//         console.log(payload);
//         const { error } = await supabase.from('patients').insert(payload);
//         if (error) {
//             alert(error.message);
//         } else {
//             state.tableJustUpdated = true;
//             await displayTodayPatient();
//         }
//     }
// }

// async function handleDeleteRow(e){
    
//     // Check if the clicked element has the 'delete-button' class
//     if (e.target.classList.contains('delete-button')) {
        
//         // Extract the ID from the data-id attribute we added in step 1
//         const patientId = e.target.getAttribute('data-id');
        
//         // Optional: Add a confirmation dialog so users don't delete by accident
//         const confirmDelete = confirm(`Are you sure you want to delete Case No: ${patientId}?`);
        
//         if (confirmDelete) {
//             // Disable the button temporarily to prevent double-clicks while deleting
//             e.target.disabled = true;
//             e.target.innerText = "Deleting...";
            
//             await deletePatient(patientId);
//         }
//     }

// }

// async function deletePatient(patientId) {
//     // 1. Delete from Supabase (assuming 'case_no' is your primary key column)
//     const { error } = await supabase
//         .from('patients')
//         .delete()
//         .eq('case_no', patientId);

//     if (error) {
//         console.error("Delete Error:", error);
//         alert("Failed to delete patient: " + error.message);
//         return;
//     }

//     // 2. Force the table to fetch fresh data and re-render
//     state.tableJustUpdated = true;
//     await displayTodayPatient();
// }

// function validateRegistration() {
//     let validationStatus = true;
//     const age = registrationForm.querySelector('#' + VALIDATION_FIELDS[0]);
//     const mobileNumber = registrationForm.querySelector('#' + VALIDATION_FIELDS[1]);

//     const ageErrorMessage = registrationForm.querySelector('#' + VALIDATION_FIELDS[0] + '-error');
//     const mobileErrorMessage = registrationForm.querySelector('#' + VALIDATION_FIELDS[1] + '-error');

//     if (age.value < 1 || age.value > 99) {
//         ageErrorMessage.innerText = "Age needs to be between 0 and 100";
//         ageErrorMessage.style.display = "block";
//         validationStatus = false;
//     } else {
//         ageErrorMessage.style.display = "none";
//     }

//     if (mobileNumber.value < 0) {
//         mobileErrorMessage.innerText = "Mobile Number cannot be a negative value";
//         mobileErrorMessage.style.display = "block";
//         validationStatus = false;
//     } else if (mobileNumber.value > 9999999999 || mobileNumber.value < 1000000000) {
//         mobileErrorMessage.innerText = "Mobile Number needs to be 10 digits";
//         mobileErrorMessage.style.display = "block";
//         validationStatus = false;
//     } else {
//         mobileErrorMessage.style.disUNIQUE_IDENTIFIERplay = "none";
//     }

//     return validationStatus;
// }

export { __Visits__};

