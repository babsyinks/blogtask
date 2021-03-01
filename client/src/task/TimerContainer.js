import React from 'react';
import EditableTimerList from './EditableTimerList';
import ToggleCreateTimer from './ToggleCreateTimer';
import uuid from 'uuid/v1';


export default class TimerContainer extends React.Component{

    constructor(){
        super()
        this.state = {timers:[],
    lastId:uuid()}

       this.setTimerList =this.setTimerList.bind(this)
       this.editTimerList = this.editTimerList.bind(this)
       this.editButtonClick = this.editButtonClick.bind(this)
       this.deleteTimer = this.deleteTimer.bind(this)
       this.cancelTimer = this.cancelTimer.bind(this)
    }

    /*

    {id:1,title:'Fishing Course',project:'How to catch and grill fish',displayEdit:false},
        {id:2,title:'Programming Course',project:'Learn to program expertly',displayEdit:false},
        {id:3,title:'Engineering Course',project:'Learn core engineering principles',displayEdit:false }

    */


    componentDidMount(){
        fetch('/api/timers').then(res=>
            res.json()
        ).then(resp=>{
            this.setState({timers:resp})   
        }
        ).catch(err=>{
            console.log(err)
        })
    }

    setTimerList(timer){
       
      let newTimer = [...this.state.timers,timer]

      fetch('/api/timers',{
          method:'post',
          body:JSON.stringify(timer),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }).then(
            ()=>{
               this.setState({timers:newTimer})  
            }
        ).catch(
            (err)=>{
                console.log(err)
            }
        )
   
    }

    editTimerList(id,timers){ 

       let targetTimer = null

        timers.forEach(timer => {
            
            if(timer.id === id){

                targetTimer = timer

            }  
        })

        return function(title,project,date,time){
            let filteredTimers = timers.filter((timer)=>timer.id !== targetTimer.id)
            targetTimer.title = title
            targetTimer.project = project
            targetTimer.date = date
            targetTimer.time = time
            targetTimer.displayEdit = false
            let updatedTimer = [...filteredTimers,targetTimer]
            let sortedUpdatedTimer = updatedTimer.sort(function(timer1,timer2){
                if(timer1.id<timer2.id){
                    return -1
                }
                else{
                    return 1
                }


            })

            fetch('api/timers/edit',{
                method:'post',
                body:JSON.stringify(targetTimer),
                headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'}}).then((res)=>{
                    this.setState({timers:sortedUpdatedTimer})
                }
                
            ).catch((err)=>console.log(err))
            
         }.bind(this)
    }

    editButtonClick(id){
        let singleTimer = this.state.timers.filter(timer=>timer.id === id)
        let timers = this.state.timers.filter(timer=>timer.id !== id)

        let timer = singleTimer[0]
        let EditedTimer = {...timer}
        EditedTimer.displayEdit = true

        const finalTimer = [...timers,EditedTimer]
        const sortedFinalTimer = finalTimer.sort(function(timer1,timer2){
            if(timer1.id<timer2.id){
                return -1
            }
            else{
                return 1
            }


        })
        this.setState({timers:sortedFinalTimer})



    }

    deleteTimer(id){
        const filteredTimer = this.state.timers.filter(timer=>timer.id === id)
        fetch('/api/timers',{
            method:'delete',
            body:JSON.stringify(filteredTimer[0]),
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }}).then(
                res=>res.json()   
            ).then(resp=>{
                this.setState({timers:resp}) 
            })
        

    }

    cancelTimer(id){

        let singleTimer = this.state.timers.filter(timer=>timer.id === id)
        let timers = this.state.timers.filter(timer=>timer.id !== id)

        let timer = singleTimer[0]
        let EditedTimer = {...timer}
        EditedTimer.displayEdit = false

        const finalTimer = [...timers,EditedTimer]
        const sortedFinalTimer = finalTimer.sort(function(timer1,timer2){
            if(timer1.id<timer2.id){
                return -1
            }
            else{
                return 1
            }


        })
        this.setState({timers:sortedFinalTimer})



    }

   

    render(){

         return (
        <div style = {{backgroundColor:'black',borderRadius:'5px',padding:'5px',color:'white',margintop:'100px'}}>

            <EditableTimerList style = {{border:'1px solid black'}} timers = {this.state.timers} editTimer = {this.editTimerList} editButtonClick = {this.editButtonClick} deleteTimer = {this.deleteTimer} cancelTimer = {this.cancelTimer}/>
            <ToggleCreateTimer lastId = {this.state.lastId} createNewTimer = {this.setTimerList}/>
        </div>
    )
    }
   
}
