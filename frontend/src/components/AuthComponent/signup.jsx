import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import '../AuthComponentCSS/signup.css'
function SignUp(){
    const navigate=useNavigate()
    const [username,setUsername]=useState(null)
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [accountType,setAccountType]=useState("public")
    const [loding,setLoding]=useState(false)
    const [error,setError]=useState(null)
    async function signupUser(e){
        e.preventDefault()
        setLoding(true)
        const response=await fetch("http://localhost:4000/api/auth/signup",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                username,
                email,
                password,
                accountType
            })
        })
        const data=await response.json()
        if(data.success){
          navigate("/login")
        }
        else{
          setError(data.message)
        }
        setLoding(false)
    }

   if(loding){
    return( 
        <h3>loding....</h3>
    )
   }


    return (
      <div className="signup-container">
        {
          error && <p className="error">{error}</p>
        }
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={signupUser} className="signup-form">
        <div className="form-group">
          <label htmlFor="username" className="signup-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="signup-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="signup-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group">
        </div>
        <button type="submit" className="btn-signup">Sign Up</button>
      </form>
      <p>Don't have an account? <Link to={"/login"} className="signup-link">login</Link></p>
    </div>
    
    )
}

export default SignUp