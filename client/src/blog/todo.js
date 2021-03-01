 import React from 'react'
 import TimerContainer from '../task/TimerContainer';
 import '../task/timerStyles.css'

 const Todo = ()=>{
 return (
     <div className = 'timer' style = {{display:'flex',color:'white',backgroundColor: `rgb(3, 3, 94)`,width:'100%',height:'10%',marginTop:'0px',paddingTop:'0px',paddingBottom:'auto',marginBottom:'0px'}}>
        <div style = {{width:'473px',justifyContent:'center',textAlign:'center',marginLeft:'auto',marginRight:'auto'}}>
        <h2 style = {{fontfamily: "Montserrat"}}>Create and Manage Your Various Tasks</h2>
        <TimerContainer />
        </div>    
     </div>
      
   
)
}

export default Todo