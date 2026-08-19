export function tableComp(tableData,headings,keys,addDeleteButton=false,uniqueIdentifier=null){
    const tableDataKeys = [...tableData.keys()]
    return (
        `<table>

            <tr>
                ${headings.map((h)=>{
                    return(`<th>${h}</th>`);
                }).join('')}
            </tr>



            ${tableDataKeys.map((row)=>{
                return(
                    `<tr>
                        ${keys.map((key)=>{
                                return(
                                    `<td>${tableData[row][key]}</td>`
                                )
                                
                            }).join('')}
                        ${addDeleteButton ? `<td><button class="delete-button data-id="${tableData[row][uniqueIdentifier]}>Delete</button></td>`:""}
                    </tr>`
                )
            }).join('')}
            
        </table>`
    );
};
