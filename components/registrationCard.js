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
//     
//     
//     return [validationStatus,[firstName.value,lastName.value,mobileNumber.value,age.value,address.value,husbandFather.value]];

// };

export {formComp};