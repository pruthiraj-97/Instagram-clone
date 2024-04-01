import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import '../NotificationCSS/followerCompoCCS.css'
function Following(){
    const {id}=useParams()
    const navigate=useNavigate()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [following,setFollowing]=useState([])
    useEffect(()=>{
        (async ()=>{
          const response=await fetch(`http://localhost:4000/api/auth/getuserprofile/${id}`,{
            method:'GET',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
          })
          const data=await response.json()
          setFollowing(data.userProfile.following)
          
        })()
    },[])
    function unfollowUser(unfollowId){
      return async (e)=>{
         e.preventDefault()
         const response=await fetch(`http://localhost:4000/api/auth/unfollowuser/${unfollowId}`,{
           method:'PUT',
           headers:{
               'x-auth-token':localStorage.getItem('token')
           }
         })
         const data=await response.json()
         if(data.success){
          localStorage.setItem('user',JSON.stringify(data.user))
         setUser(data.user)
         setFollowing(data.user.following)
         }
      }
    }

    return (
        <div className="followers-container">
        {
         following.map((userProfile, index) => (
           <div className="followers" key={index}>
             <div className="profile-logo"
               onClick={()=>navigate(`/userprofile/${userProfile._id}`)}
             >
               <img src={userProfile.image} alt={userProfile.username} />
             </div>
             <p>{userProfile.username}</p>
             <button 
             onClick={unfollowUser(userProfile._id)}>unfollow</button>
           </div>
         ))
       }
     </div>
    )
}

export default Following