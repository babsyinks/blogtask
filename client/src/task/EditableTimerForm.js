import React from 'react';


export default class EditableTimerForm extends React.Component{

    constructor(props){
        
        super(props)

        this.state = {id:this.props.id||'',title:this.props.title||'',project:this.props.project||'',
                      date:this.props.date||'',time:this.props.time||''}

        this.setTitle = this.setTitle.bind(this)
        this.setProject = this.setProject.bind(this)
        this.setDate = this.setDate.bind(this)
        this.setTime = this.setTime.bind(this)
        this.handleCreateOrEdit = this.handleCreateOrEdit.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.completeUpdate = this.completeUpdate.bind(this)

    }


    setTitle(e){
       this.setState({title:e.target.value})
    }

    setProject(e){
        this.setState({project:e.target.value})
     }

     setDate(e){
        this.setState({date:e.target.value})
     }

     setTime(e){
        this.setState({time:e.target.value})
     }

     handleCreateOrEdit(){
         if(this.state.title === ''||this.state.project === ''||this.state.date === ''||this.state.time === ''){
             alert("You are not allowed to submit empty fields")
         }
         else{
             if(this.props.set === 'Create'){
                this.props.click(this.state.id,this.state.title,this.state.project,this.state.date,this.state.time)  
             }
             else{
                let updateFunction = this.props.click(this.state.id,this.props.timers)
             updateFunction(this.state.title,this.state.project,this.state.date,this.state.time) 
             }

             
            
         }
         
     }

     completeUpdate(timer){


     }

     handleCancel(){
         this.props.cancelTimer(this.props.id)
     }

     
    render(){
           return (
        <div style = {{textAlign:"left",border:this.props.set === 'Update'?'1px solid red':'',margin:this.props.set === 'Update'?'5px':''}}>
            <div><label style = {{padding:'5px',marginRight:'19px'}}>Title:</label> <input onChange = {this.setTitle} value = {this.state.title}></input></div>
            <div style = {{marginBottom:'1px'}}><label style = {{padding:'5px'}}>Project:</label> <input onChange = {this.setProject} value = {this.state.project}></input></div>
            <div style = {{marginBottom:'2px'}}><label style = {{padding:'5px',marginRight:'16px'}}>Date:</label> <input type = 'date' onChange = {this.setDate} value = {this.state.date}></input></div>
            <div><label style = {{padding:'5px',marginRight:'15px'}}>Time:</label> <input type = 'time' onChange = {this.setTime} value = {this.state.time}></input></div>
            <div style = {{textAlign:"center"}}><input type = 'button' onClick = {this.handleCreateOrEdit} style = {{margin:'5px'}} value = {this.props.set}/>
                 <input type = 'button' onClick = {this.handleCancel} style = {{margin:'5px'}} value = 'Cancel'/>
            </div>
        </div>
    )
    }

 
}