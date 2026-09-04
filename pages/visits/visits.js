
import __registrationForm__ from "./sections/registrationForm";
import __todayPatient__ from "./sections/todayPatient";

async function __Visits__(contentContainer) {
    contentContainer.replaceChildren();
    __registrationForm__(contentContainer);
    await __todayPatient__(contentContainer);
};

export { __Visits__};

