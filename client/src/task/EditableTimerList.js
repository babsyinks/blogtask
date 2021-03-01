import React from 'react';
import EditableTimer from './EditableTimer';
import EditableTimerForm from './EditableTimerForm';

export default class EditableTimerList extends React.Component{

    render(){
        return (
            <div style = {{border:'1px solid purple',margin:'2px'}}>
                {this.props.timers.map((timer)=><div key = {timer.id}><EditableTimer  id = {timer.id} title = {timer.title} project = {timer.project} date = {timer.date} time = {timer.time} editButtonClick = {this.props.editButtonClick} deleteTimer = {this.props.deleteTimer} />
                {timer.displayEdit?<EditableTimerForm id = {timer.id} title = {timer.title} project = {timer.project} date = {timer.date} time = {timer.time} set = "Update" click = {this.props.editTimer} timers = {this.props.timers} cancelTimer = {this.props.cancelTimer}/>:''}</div>)}
                
            </div>
        )
    }
}