import React, { useState } from 'react'
import color from '../../../../Feature/Config/color'

export const ESAddRow=(props)=>{
    const [Tablelist,setTableList]=useState(Body);
    const [Name,setName]=useState('');
    const thStyle={backgroundColor: color.primaryColor }

    const handleChange=(e)=>{
        setName(e.target.value)
    }

    const handleAdd=()=>{
        const newRow=Tablelist.concat({Name});
        //console.log("newRow", newRow);
        setTableList(newRow)
    }

    const title=Header.map((v,k)=>
        <tr  key={k}>
            <th>{v.h1}</th>
            <th>{v.h2}</th>
            <th>{v.h3}</th>
        </tr>
    )
    const tbody= 
        Tablelist.map((v,k)=>
            <tr key={k}>
                <td>{v.column1}</td>
                <td>{v.column2}</td>
                <td>{v.column3}</td>
            </tr>
    )

    return(
        <div className="mx-4 mt-4">
            <table className="table table-bordered table-striped table-sm">    
                <thead style={thStyle}>
                    {title}
                </thead>  
                <tbody>
                    {tbody}
                </tbody>   
            </table>
            <div className="text-left text-primary" style={{cursor: 'pointer'}} value={Name} onChange={handleChange}>
                 {/* <input type="text" value={Name} onChange={handleChange}/> */}
                <i className="fa fa-plus-circle fa-2x pr-3" aria-hidden="true" onClick={handleAdd}></i>
            </div>
        </div>
    )
}
const Header=[{h1: "header1", h2 : 'header2', h3: 'header3'}]
const Body=[
    {column1: 'welcome', column2: 'from', column3: 'undp'},
    {column1: 'welcome', column2: 'from', column3: 'undp'},
    {column1: 'welcome', column2: 'from', column3: 'undp'}
]
// const Body=[{
//     "id": 1,
//     "row": [{column1: 'welcome', column2: 'from', column3: 'undp'}]
// },
// {
//     "id": 2,
//     "row": [{column1: 'welcome', column2: 'from', column3: 'undp'}]
// },
// {
//     "id": 3,
//     "row": [{column1: 'welcome', column2: 'from', column3: 'undp'}]
// },
// ]
