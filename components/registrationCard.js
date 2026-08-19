// import { registrationCardContainer } from "../pages/visits";

function formComp(fields, formName = "") {
    return `
        <form id="${formName}-form">
            ${fields.map(field => `
                <div id="${field.id}-container" class="input-container">
                    <label for="${field.id}">${field.label}</label>
                    <input 
                        type="${field.type}" 
                        id="${field.id}" 
                        placeholder="${field.label}" 
                        ${field.required ? "required" : ""}
                    >
                    ${field.errorMsg ? `<div id="${field.id}-error" style="display: none;" class="error-msg">${field.errorMsg}</div>` : ""}
                </div>
            `).join('')}
            
            <button type="submit">Register Patient</button>
        </form>
    `;
}

// const registrationForm = registrationCardContainer.querySelector('form');
// const {
//     'first-name': firstName,
//     'last-name': lastName,
//     'mobile-number': mobileNumber,
//     age,
//     address,
//     'husband-father': husbandFather
// } = registrationForm.elements;
// const mobileErrorMessage = registrationCardContainer.querySelector("#mobile-error-message");
// const ageErrorMessage = registrationCardContainer.querySelector('#age-error-message');

// function formValidation(){
//     let validationStatus = true;
//     if(mobileNumber.value < 0){
//         mobileErrorMessage.innerText = "Mobile Number cannot be a negative value";
//         mobileErrorMessage.style.display = "block";
//         validationStatus = false;
//     } else if(mobileNumber.value > 9999999999 || mobileNumber.value < 1000000000 ){
//         mobileErrorMessage.innerText = "Mobile Number needs to be 10 digits";
//         mobileErrorMessage.style.display = "block";
//         validationStatus = false;
//     } else {
//         mobileErrorMessage.style.display = "none";
//     }

//     if(age.value < 1 || age.value > 99 ){
//         ageErrorMessage.innerText = "Age needs to be between 0 and 100";
//         ageErrorMessage.style.display = "block";
//         validationStatus = false;
//     } else {
//         ageErrorMessage.style.display = "none";
//     }
//     return [validationStatus,[firstName.value,lastName.value,mobileNumber.value,age.value,address.value,husbandFather.value]];

// };

export {formComp};