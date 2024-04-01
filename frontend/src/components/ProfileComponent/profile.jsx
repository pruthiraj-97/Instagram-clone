import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import {FaPlus} from "react-icons/fa";
import '../ProfileComponenetCSS/profile.css'
function Profile(){
    const navigate=useNavigate()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [loding,setLoding]=useState(false)
    const [posts,setPosts]=useState([])
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
            if(data.success){
                setUser(data.profile)
                setPosts(data.profile.posts)
            }else{
              navigate("/login")
            }
            setLoding(false) 
        })()
    },[])
    
    if(loding){
        return (
            <h1>loding....</h1>
        )
    }
    
    return (
      <div className="profile">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={user && user.image} alt="Profile" />
          <div className="create-story" onClick={() => navigate("/myprofile/addstory")}>
            <FaPlus className="story-icon" />
          </div>
        </div>
        <div className="profile-info">
          <h2>{user && user.username}</h2>
          <div className="follow-info">
            <p><Link to={`/userfollowers/${user._id}`}>Followers</Link></p>
            <p><Link to={`/userfollowing/${user._id}`}>Following</Link></p>
          </div>
          <div className="profile-actions">
            <button className="add-post-button" onClick={() => navigate("/myprofile/addpost")}>
              Add Post
            </button>
          </div>
        </div>
      </div>
      <div className="profile-content">
        <div className="profile-posts">
          <h3>My Posts</h3>
          <div className="posts">
            {posts.length > 0 &&
              posts.map((post, index) => (
                <div
                  className="user-post"
                  key={index}
                  onClick={() => navigate(`/myprofile/mypost/${post._id}`)}
                >
                  <img src={post.post} alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile