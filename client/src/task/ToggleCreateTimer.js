import React from 'react';
import EditableTimerForm from './EditableTimerForm';


export default class ToggleCreateTimer extends React.Component{

    constructor(){
        super()
        this.state = {
            createNewForm:false
        }

        this.showHide = this.showHide.bind(this)
        this.createTimer = this.createTimer.bind(this)
        this.cancelTimer = this.cancelTimer.bind(this)
    }

    showHide(){
        this.setState({createNewForm:!this.state.createNewForm})
     }

     createTimer(id,title,project,date,time){
        
        this.props.createNewTimer({id,title,project,date,time,displayEdit:false})
        this.showHide()

     }

     cancelTimer(){
         this.showHide()
     }
    render(){
        return (
            <div style = {{border:this.state.createNewForm?'1px solid green':''}}>
                {this.state.createNewForm?<EditableTimerForm id ={this.props.lastId} set = "Create" click = {this.createTimer} cancelTimer = {this.cancelTimer} />:<input type = 'button' onClick = {this.showHide} value = "+" style = {{border:'2px solid green',borderRadius:'5px'}}/> }
            </div>
        )
    }
}