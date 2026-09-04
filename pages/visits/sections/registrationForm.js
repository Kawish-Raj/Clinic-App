import FORM_COMP from "../../../components/registrationCard";
import { supabase } from "../../../database_helpers/supabase";
import { UNIQUE_IDENTIFIER, PATIENT_FIELDS, VALIDATION_FIELDS } from "../../../database_helpers/patients_table";

const template = document.createElement('template');
template.innerHTML = FORM_COMP(PATIENT_FIELDS, "registration", UNIQUE_IDENTIFIER).trim();

// 1. Get direct reference to the form in memory
const registrationForm = template.content.firstElementChild;

// 2. Attach submit handler directly to the element instance
registrationForm.addEventListener('submit', async (e) => await handleLoginFormSubmission(e));

export default function __registrationForm__(registrationFormContainer){
    // 3. Move the exact form object into the container (preserves event listeners)
    registrationFormContainer.replaceChildren(registrationForm);
}

async function handleLoginFormSubmission(e){
    e.preventDefault(); // Prevents page reload on the live form
    
    let status = validateRegistration(e.target);
    if (status) {
        const payload = {};
        const formElement = e.target; // e.target refers to the active <form>

        PATIENT_FIELDS.forEach((field) => {
            if(field.id !== UNIQUE_IDENTIFIER){
                payload[field.id] = formElement.querySelector(`#${field.id}`).value;
            }    
        });
        
        console.log(payload);
        const { error } = await supabase.from('patients').insert(payload);
        if (error) {
            alert(error.message);
        }
    }
}

function validateRegistration(registrationForm){
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
        mobileErrorMessage.style.disUNIQUE_IDENTIFIERplay = "none";
    }

    return validationStatus;
}