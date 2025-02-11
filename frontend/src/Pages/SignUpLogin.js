import React, { useState } from 'react'
import './CSS/SignUpLogin.css'
function SignUpLogin() {
  const [state,setState] = useState("Sign Up")
  const [formdata,setFormdata] = useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler= (e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})

  }
  const login = async ()=>{
    // console.log("Login",formdata);
    let responseData;
    await fetch("http://localhost:4000/login",{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formdata)
    }).then((res)=>res.json()).then((data)=>responseData=data)
    
    // console.log('data',responseData);
    if(responseData.success){
      localStorage.setItem('username',responseData.user.name)
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.error)
    }
    
  }
  
  const signup = async ()=>{
    console.log("signup",formdata);
    let responseData;
    await fetch("http://localhost:4000/signup",{
      method:"POST",
      headers:{
        Accept:"application/form-data",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(formdata)
    }).then((res)=>res.json()).then((data)=>responseData=data)
    if(responseData.success){
      
      // localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.error)
    }
  }
  
  return (
    <div className='SignUpLogin'>
      <div className='SignUpLogin-Container'>
        <h1>{state}</h1>
        <div className='SignUpLogin-Fields'>
          {state==="Sign Up"?<input name='username' value={formdata.username} onChange={changeHandler} type='text' placeholder='Your Name'/>:<></>}
          <input name='email' value={formdata.email} onChange={changeHandler} type='email' placeholder='Email Address'/>
          <input name='password' value={formdata.password} onChange={changeHandler} type='password' placeholder='Password'/>
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"
        ? <p className='SignUpLogin-login'>Alredy have a account ? <span onClick={()=>{setState("Login")}}>Login</span></p>
        :
        <p className='SignUpLogin-login'>Create an account ? <span  onClick={()=>{setState("Sign Up")}}>Click here</span></p>
      
      }
       
        
        <div className='SignUpLogin-agree'>
          <input type='checkbox' name='' id=''/>
          <p>By Continuing, i agree to the terms of use & privacy.</p>

        </div>

      </div>
    </div>
  )
}

export default SignUpLogin