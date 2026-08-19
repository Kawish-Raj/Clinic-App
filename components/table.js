export function tableComp(tableData,headings,fields,addDeleteButton=false,uniqueIdentifier=null){
    return (
        `<table>

            <tr>
                ${headings.map((h)=>{
                    return(`<th>${h}</th>`);
                }).join('')}
            </tr>



            ${Object.entries(tableData).map(([index,data])=>{
                return(
                    `<tr>
                        ${fields.map((field)=>{
                                return(
                                    `<td>${data[field.id]}</td>`
                                )
                                
                            }).join('')}
                        ${addDeleteButton ? `<td><button class="delete-button" data-id="${data[uniqueIdentifier]}">Delete</button></td>`:""}
                    </tr>`
                )
            }).join('')}
            
        </table>`
    );
};
