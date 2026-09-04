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
const VALIDATION_FIELDS = ["age", "mobile_number"];

const PATIENT_TABLE_HEADINGS = ["Case No", "First Name", "Last Name", "Mobile Number", "Age", "Address", "Husband/Father"];

export {UNIQUE_IDENTIFIER,
        PATIENT_FIELDS,
        VALIDATION_FIELDS,
        PATIENT_TABLE_HEADINGS
    };