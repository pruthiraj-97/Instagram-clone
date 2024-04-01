import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import '../NotificationCSS/NotificationCSS.css'
import socket from '../socket/socket'
import { FaAsymmetrik } from "react-icons/fa";
function Notification(){
    const navigate=useNavigate()
    const [requests,setRequest]=useState([])
    const [loding,setLoding]=useState(false)
    const [postMessage,setPostMessage]=useState([])
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    useEffect(()=>{
      (async ()=>{
        const response=await fetch("http://localhost:4000/api/auth/profile",{
        method:'GET',
        headers:{
            'x-auth-token':localStorage.getItem('token'),
            'Content-Type':'application/json'
        }
       })
       const data=await response.json()
       if(data.success){
        setRequest(data.profile.followRequests)
        setPostMessage(data.profile.notification)
       }
      })()
      return async () => {
         const response=await fetch("http://localhost:4000/api/notification/removenotification",{
             method:'DELETE',
             headers:{
                 'x-auth-token':localStorage.getItem('token'),
                 'Content-Type':'application/json'
             }
         })
         const data=await response.json()
         localStorage.setItem('user',JSON.stringify(data.profile))
         setUser(data.profile)
      }
    },[])

    async function handleAcceptRequest(id){
        const response=await fetch(`http://localhost:4000/api/auth/acceptfollowrequest/${id}`,{
           method:'POST',
           headers:{
               'x-auth-token':localStorage.getItem('token'),
               'Content-Type':'application/json'
           }
        })
        const data=await response.json()
        localStorage.setItem('user',JSON.stringify(data.profile))
        setRequest(data.profile.followRequests)
    }

   async function handleDenyRequest(id){
      const response=await fetch(`http://localhost:4000/api/auth/denyfollowrequest/${id}`,{
         method:'PUT',
         headers:{
             'x-auth-token':localStorage.getItem('token'),
             'Content-Type':'application/json'
         }
      })
      const data=await response.json()
      localStorage.setItem('user',JSON.stringify(data.profile))
      setRequest(data.profile.followRequests)
    }

   useEffect(()=>{
    socket.on('newNotification',(data)=>{
          if(data.user._id!=user._id){
            setPostMessage((prev)=>[...prev,data])
          }
      })
   },[socket])
   
   if(loding||!requests){
    return(
        <h1>loding...</h1>
    )
   }
    return (
        <div className="notification-container">
        <h2>Notifications</h2>
        {requests.length === 0 ? (
          <p>No Notification at the moment.</p>
        ) : (
          <ul className="notification-list">
            {requests.map((request, index) => (
              <li key={index} className="notification-item">
                <img src={request.image} alt="User" className="user-image" 
                  onClick={()=>navigate(`/userprofile/${request._id}`)}
                />
                <div className="user-details">
                  <span className="username">{request.username}</span>
                  <div className="button-container">
                    <button className="accept-button" onClick={() => handleAcceptRequest(request._id)}>Accept</button>
                    <button className="deny-button" onClick={() => handleDenyRequest(request._id)}>Deny</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {postMessage.length!=0&&
  <ul className="notification-list">
    {postMessage.map((message, index) => (
      <li key={index} className="notification-item">
        <img
          src={message.user.image}
          alt="User"
          className="user-image"
        />
        <div className="user-details">
          <span className="username">{message.user.username}</span>
          <div className="message">{message.message}</div>
        </div>
      </li>
  ))}
  </ul>
}
      </div>
    )
}

export default Notification