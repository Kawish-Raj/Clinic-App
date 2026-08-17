import { supabase } from "../components/supabase";

const contentContainer = document.querySelector("#app-content");

export async function renderVisits(){
    contentContainer.innerHTML = "<h2>Loding...</h2>";
    const {data,error} = await supabase.from('patients').select();
    if (error) {
        console.log(error);
        contentContainer.innerHTML = "<p>Error loading data.</p>";
        return;
    }

    if (!data || data.length === 0) {
        contentContainer.innerHTML = "<p>No patients found.</p>";
        return;
    }

    // Use backticks `` and target a specific column property (e.g., .name)
    contentContainer.innerHTML = `<table>
                                    ${tableHeadings}
                                    ${data.map((patient)=>{ 
                                        console.log(patient);
                                        return(
                                        `<tr>
                                            <td> ${patient.case_no} </td>
                                            <td> ${patient.first_name} </td>
                                            <td> ${patient.last_name} </td>
                                            <td> ${patient.mobile_number} </td>
                                            <td> ${patient.age} </td>
                                            <td> ${patient.address} </td>
                                            <td> ${patient.husband_father} </td>
                                        </tr>
                                            `)
                                    })}
                                </table>`;
};

const tableHeadings = `<tr> 
                            <th> Case No. </th>
                            <th> First Name</th>
                            <th> Last Name</th>
                            <th> Mobile Number</th>
                            <th> Age </th>
                            <th> Address </th>
                            <th> Husband/Father </th>
                        </tr>`