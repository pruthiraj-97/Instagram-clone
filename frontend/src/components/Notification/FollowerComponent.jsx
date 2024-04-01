import React,{useState,useEffect} from "react";
import { useParams,useNavigate } from "react-router-dom";
import {FaTimes} from 'react-icons/fa'
import '../NotificationCSS/followerCompoCCS.css'
function Followers(){
    const {id}=useParams()
    const navigate=useNavigate()
    const [followers,setFollowers]=useState([])
    const [loding,setLoding]=useState(false)
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    useEffect(()=>{
      (async ()=>{
        setLoding(true)
        const response=await fetch(`http://localhost:4000/api/auth/getuserprofile/${id}`,{
            method:'GET',
            headers:{
                'x-auth-token':localStorage.getItem('token')
            }
        })  
        const data=await response.json()
        if(data.success){
        setFollowers(data.userProfile.followers)
        }
        setLoding(false)
      })()
    },[])
     console.log(followers)
     function removeFollower(deleteId){
        return  async (e)=>{
        e.preventDefault()
        const response=await fetch(`http://localhost:4000/api/auth/removefollowers/${deleteId}`,{
           method:'DELETE',
           headers:{
               'x-auth-token':localStorage.getItem('token'),
               'Content-Type':'application/json'
           }
        })
        const data=await response.json()
        console.log(data)
        localStorage.setItem('user',JSON.stringify(data.user))
        setUser(data.user)
        setFollowers(data.user.followers)
      }
    }

    function sendRequest(sendId){
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
      }
    }
    if(loding){
      return (
        <div className="followers-container">
           <h1>loding</h1>
        </div>
      )
    }
    return (
      <div className="followers-container">
      {followers.map((userProfile, index) => (
        <div className={`followers ${userProfile._id === user._id ? 'user-self' : ''}`} key={index}>
          <div className="profile-logo"
           onClick={()=>userProfile._id==user._id?navigate('/myprofile'):navigate(`/profile/${userProfile._id}`)}
          >
            <img src={userProfile.image} alt={userProfile.username} />
          </div>
          <p>{userProfile.username}</p>
          {
          <div className="delete-icon">
          <button
          onClick={sendRequest(userProfile._id)}
          >{user.myRequests.includes(userProfile._id) ? 'Requested' : user.following.includes(userProfile._id) ? 'Following' : 'Follow'}</button>
          {id == user._id && ( 
            <FaTimes className="remove-icon" onClick={ removeFollower(userProfile._id) }/>
          )}
          </div>
          }
        </div>
      ))}
    </div>
    )
}

export default Followers