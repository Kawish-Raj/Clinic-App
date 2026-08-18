const registrationCardContainer = document.createElement("div");
registrationCardContainer.id = "registration-card-container";

registrationCardContainer.innerHTML = 
`<div id="registration-card">
        <form id="registration-form">
            <div id="first-name-container" class="input-container">
                <label for="first-name">First Name</label>
                <input type="text" id="first-name" placeholder="First Name" required>
            </div>
            <div id="last-name-container" class="input-container">
                <label for="last-name">Last name</label>
                <input type="text" id="last-name" placeholder="Last Name" required>
            </div>
            <div id="mobile-number-container" class="input-container">
                <label for="mobile-number">Mobile Number</label>
                <input type="number" id="mobile-number" placeholder="Mobile Number" required>
            </div>
            <div id="mobile-error-message" style="display: none;">Invalid Mobile Number</div>
            <div id="age-container" class="input-container">
                <label for="age">Age</label>
                <input type="number" id="age" placeholder="Age" required>
            </div>
            <div id="age-error-message" style="display: none;">Invalid Age</div>
            <div id="husband-father-container" class="input-container">
                <label for="husband-father">Husband/Father</label>
                <input type="text" id="husband-father" placeholder="Husband/Father" required>
            </div>
            <button type="submit">Register Patient</button>
        </form>
    </div>`;

const registrationForm = registrationCardContainer.querySelector('form');
const {
    'first-name': firstName,
    'last-name': lastName,
    'mobile-number': mobileNumber,
    age,
    'husband-father': husbandFather
} = registrationForm.elements;
const mobileErrorMessage = registrationCardContainer.querySelector("#mobile-error-message");
const ageErrorMessage = registrationCardContainer.querySelector('#age-error-message');

function formValidation(){
    let validationStatus = true;
    if(mobileNumber.value < 0){
        mobileErrorMessage.innerText = "Mobile Number cannot be a negative value";
        mobileErrorMessage.style.display = "block";
        validationStatus = false;
    } else if(mobileNumber.value > 9999999999 || mobileNumber.value < 1000000000 ){
        mobileErrorMessage.innerText = "Mobile Number needs to be 10 digits";
        mobileErrorMessage.style.display = "block";
        validationStatus = false;
    } else {
        mobileErrorMessage.style.display = "none";
    }

    if(age.value < 1 || age.value > 99 ){
        ageErrorMessage.innerText = "Age needs to be between 0 and 100";
        ageErrorMessage.style.display = "block";
        validationStatus = false;
    } else {
        ageErrorMessage.style.display = "none";
    }
    return validationStatus;

};

export {registrationCardContainer,formValidation};