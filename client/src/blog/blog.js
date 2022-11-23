import React from 'react'

class Blog extends React.Component{

  render(){ 
    return (
      <div className = 'blogAccess'>
       <h2>You need an account to access the blog.Will you like to continue?</h2>
       <a href='https://blogtask.onrender.com/signIn' ><input type = 'button' value = 'Yes' /></a>
       <a href='/'><input type = 'button' value = 'No'/></a>
       </div>
    )
  }
    
}



export default Blog