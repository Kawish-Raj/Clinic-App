import { supabase } from "../../../database_helpers/supabase";
import { UNIQUE_IDENTIFIER, PATIENT_FIELDS, PATIENT_TABLE_HEADINGS,state } from "../helpers";
import { TABLE_COMP } from "../../../components/table";

let cachedData = null;

const patientTableContainer = document.createElement("div");
patientTableContainer.id = "patient-visit-table";
patientTableContainer.addEventListener('click', async (e) => await handleDeleteRow(e));


export default async function __todayPatient__(contentContainer){
    contentContainer.append(patientTableContainer);
    await renderPaitientTable();
}   

async function renderPaitientTable(){
    if (cachedData == null || state.tableJustUpdated) {
            if (!state.tableJustUpdated) { patientTableContainer.innerHTML = "<h2>Loding...</h2>"; };
            const { data: freshData, error } = await supabase.from('patients').select();
    
            if (error) {
                console.log(error);
                patientTableContainer.innerHTML = "<p>Error loading data.</p>";
                return;
            }
    
            if (!freshData || freshData.length === 0) {
                patientTableContainer.innerHTML = "<p>No patients found.</p>";
                return;
            }
    
            cachedData = freshData;
            state.tableJustUpdated = false;
        }
    
    patientTableContainer.innerHTML = TABLE_COMP(cachedData, PATIENT_TABLE_HEADINGS, PATIENT_FIELDS, true, UNIQUE_IDENTIFIER);
}

async function handleDeleteRow(e){
    
    // Check if the clicked element has the 'delete-button' class
    if (e.target.classList.contains('delete-button')) {
        
        // Extract the ID from the data-id attribute we added in step 1
        const patientId = e.target.getAttribute('data-id');
        
        // Optional: Add a confirmation dialog so users don't delete by accident
        const confirmDelete = confirm(`Are you sure you want to delete Case No: ${patientId}?`);
        
        if (confirmDelete) {
            // Disable the button temporarily to prevent double-clicks while deleting
            e.target.disabled = true;
            e.target.innerText = "Deleting...";
            
            await deletePatient(patientId);
        }
    }

}

async function deletePatient(patientId) {
    // 1. Delete from Supabase (assuming 'case_no' is your primary key column)
    const { error } = await supabase
        .from('patients')
        .delete()
        .eq('case_no', patientId);

    if (error) {
        console.error("Delete Error:", error);
        alert("Failed to delete patient: " + error.message);
        return;
    }

    // 2. Force the table to fetch fresh data and re-render
    state.tableJustUpdated = true;
    await renderPaitientTable();
}