import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import '../AuthComponentCSS/login.css'
function Login(){
  const navigate=useNavigate()
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)
  const [loding,setLoding]=useState(false)
async function handleSubmit(e){
   "use strict";
    e.preventDefault()
    setLoding(true)
    const response=await fetch("http://localhost:4000/api/auth/login",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email,
            password
        })
    })
    const data=await response.json()
    if(data.success){
     localStorage.setItem('token',data.token)
     localStorage.setItem('user',JSON.stringify(data.user))
     navigate("/")
    }
    setLoding(false)
}

    if(loding){
        return (
            <h3>loding....</h3>
        )
    }
    return (
      <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="usernameEmail" className="login-label">Email:</label>
          <input
            type="text"
            id="usernameEmail"
            name="usernameEmail"
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="login-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn-login">Login</button>
      </form>
      <p>Don't have an account? <Link to={"/signup"} className="login-link">Signup</Link></p>
    </div>
    
    )
}

export default Login