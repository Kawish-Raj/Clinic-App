import { UNIQUE_IDENTIFIER } from "../pages/visits";

function formComp(fields, formName = "") {
    return `
        <form id="${formName}-form">
            ${fields.map(field => `
                ${field.id == UNIQUE_IDENTIFIER?"":`
                <div id="${field.id}-container" class="input-container">
                    <label for="${field.id}">${field.label}</label>
                    <input 
                        type="${field.type}" 
                        id="${field.id}" 
                        placeholder="${field.label}" 
                        ${field.required ? "required" : ""}
                    >
                    ${field.errorMsg ? `<div id="${field.id}-error" style="display: none;" class="error-msg">${field.errorMsg}</div>` : ""}
                </div>`}
            `).join('')}
            
            <button type="submit">Register Patient</button>
        </form>
    `;
}
export {formComp};