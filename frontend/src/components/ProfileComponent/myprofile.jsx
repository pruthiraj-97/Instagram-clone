import '../ProfileComponenetCSS/myprofile.css'
import React,{useState,useEffect} from "react";
import { Link,useNavigate } from 'react-router-dom';
function MyProfile(){
   const [loggedin,setLoggedin]=useState(true)
   const [user,setUser]=useState(null)
   const [loding,setLoding]=useState(false)
   const navigate=useNavigate()
   useEffect(()=>{
    (async ()=>{
      setLoding(true)
      const response=await fetch("http://localhost:4000/api/auth/profile",{
        method:'GET',
        headers:{
          'x-auth-token':localStorage.getItem('token'),
          'Content-Type':'application/json'
        }
      })
      const data=await response.json()
      if(!data||!data.success){
        setLoggedin(false)
        navigate("/login")
      }else{
         setUser(data.profile)
      }
    })()
    setLoding(false)
   },[])

   function HandleProfile(e){
       e.preventDefault()
       if(!loggedin){
        navigate("/login")
       }else{
          navigate("/myprofile")
       }
   }
   if(loding){
     return <h1>Loding....</h1>
   }
    return(
    <div className="profile-container">
       <div className="profile-circle"
         onClick={HandleProfile}
       >
       <img src={user&&user.image}
         alt="Profile" className="profile-image" />
      </div>
      <p className='profile-link'>{
      user&&user.username}</p>
    </div>
    )
}
export default MyProfile