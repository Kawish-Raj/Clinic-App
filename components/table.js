export function tableComp(tableData,headings,keys){
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
                    </tr>`
                )
            }).join('')}
            
        </table>`
    );
};
