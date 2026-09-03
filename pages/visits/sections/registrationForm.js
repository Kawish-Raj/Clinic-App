import FORM_COMP from "../../../components/registrationCard";

const UNIQUE_IDENTIFIER = "case_no";
const PATIENT_FIELDS = [
    { id: UNIQUE_IDENTIFIER},
    { id: "first_name", label: "First Name", type: "text", required: true },
    { id: "last_name", label: "Last Name", type: "text", required: true },
    { id: "mobile_number", label: "Mobile Number", type: "number", required: true, errorMsg: "Invalid Mobile Number" },
    { id: "age", label: "Age", type: "number", required: true, errorMsg: "Invalid Age" },
    { id: "address", label: "Address", type: "text", required: true },
    { id: "husband_father", label: "Husband/Father", type: "text", required: true }
];

const template = document.createElement('template');
template.innerHTML = FORM_COMP(PATIENT_FIELDS,"registration",UNIQUE_IDENTIFIER).trim();
template.content.querySelector('form').addEventListener('submit',async (e) => await handleLoginFormSubmission(e));

export default function __registrationForm__(registrationFormContainer){
    registrationFormContainer.innerHTML = template.innerHTML;
}

async function handleLoginFormSubmission(){}