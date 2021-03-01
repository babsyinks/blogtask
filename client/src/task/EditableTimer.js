import React from 'react';

export default function EditableTimer(props){

    let handleEditClick = ()=>{
        props.editButtonClick(props.id)
    }

    let handleDelete = ()=>{
        props.deleteTimer(props.id)
    }
    return (
        <div style = {{textAlign:"left",border:'1px solid blue',margin:'5px'}}>

            <div>
            <label style = {{padding:'5px'}}>{`Title: `}</label>{props.title}
            </div>

            <div>
            <label style = {{padding:'5px'}}>{`Project: `}</label>{props.project}
            </div>

            <div>
            <label style = {{padding:'5px'}}>{`Date: `}</label>{props.date}
            </div>

            <div>
            <label style = {{padding:'5px'}}>{`Time: `}</label>{props.time}
            </div>

            <div style = {{textAlign:"center"}}>
                <span><input type = 'button' onClick = {handleEditClick} style = {{margin:'5px'}} value = 'Edit'/></span>
                <span><input type = 'button' onClick = {handleDelete} style = {{margin:'5px'}} value = 'Delete'/></span>
            </div>
            
        </div>
    )
}