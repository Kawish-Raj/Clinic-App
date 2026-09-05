import FORM_COMP from "../../../components/form";
import { supabase } from "../../../database_helpers/supabase";
import { TABLE_NAME,UNIQUE_IDENTIFIER, PATIENT_FIELDS, VALIDATION_FIELDS, state } from "../helpers";
import { renderPaitientTable } from "./todayPatient";

const registrationFormContainer = document.createElement("div");
registrationFormContainer.id = "registration-card-container";
registrationFormContainer.innerHTML = FORM_COMP(PATIENT_FIELDS, "registration", UNIQUE_IDENTIFIER).trim();

registrationFormContainer.addEventListener('submit', async (e) => await handleLoginFormSubmission(e));
registrationFormContainer.querySelectorAll('input').forEach(element=>{
    element.addEventListener('input',async (e)=> await handleFieldSearch(e));
})

export default function __registrationForm__(contentContainer){
    // 3. Move the exact form object into the container (preserves event listeners)
    contentContainer.append(registrationFormContainer);
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
        const { error } = await supabase.from(TABLE_NAME).insert(payload);
        if (error) {
            alert(error.message);
        }else{
            state.tableJustUpdated = true;
            await renderPaitientTable();
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


async function handleFieldSearch(e){
    let text = e.target.value;
    if(text.length%3 == 0 && !(text.length == 0)){
        const {data,error} = await supabase
            .from(TABLE_NAME)
            .select()
            .like(e.target.id,`${e.target.value}%`)

        if(error){
            alert(error.message);
        }else{
            if(data.length == 0){
                console.log("Sorry no previous entry found");
            }else{
                console.log(data);
            }
        } 
    }else if(text.length == 0){
        console.log('clear up');
    }
}