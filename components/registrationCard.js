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
                <input type="tel" id="mobile-number" placeholder="Mobile Number" required>
            </div>
            <div id="age-container" class="input-container">
                <label for="age">Age</label>
                <input type="number" id="age" placeholder="Age" required>
            </div>
            <div id="husband-father-container" class="input-container">
                <label for="husband-father">Husband/Father</label>
                <input type="text" id="husband-father" placeholder="Husband/Father" required>
            </div>
            <button type="submit">Register Patient</button>
        </form>
    </div>`;

export {registrationCardContainer};