import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import '../NotificationCSS/followerCompoCCS.css';
function FollowingCompoUser(){
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
    function handleFollow(sendId){
      return async (e)=>{
         e.preventDefault()
         const response=await fetch(`http://localhost:4000/api/auth/sendfollowrequest/${sendId}`,{
            method:'POST',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        localStorage.setItem('user',JSON.stringify(data.user))
        setUser(data.user)
        setFollowing(data.user.following)
      }
    }

    return (
        <div className="followers-container">
        {
         following.map((userProfile, index) => (
           <div className="followers" key={index}>
             <div className="profile-logo"
               onClick={()=>userProfile._id==user._id?navigate('/myprofile'):navigate(`/userprofile/${userProfile._id}`)}
             >
               <img src={userProfile.image} alt={userProfile.username} />
             </div>
             <p>{userProfile.username}</p>
             {
              user._id!=userProfile._id&&
             <button 
             onClick={handleFollow(userProfile._id)}>{user.myRequests.includes(userProfile._id) ? 'Requested' : user.following.includes(userProfile._id) ? 'Following' : 'Follow'}</button>
             }
           </div>
         ))
       }
     </div>
    )
}

export default FollowingCompoUser