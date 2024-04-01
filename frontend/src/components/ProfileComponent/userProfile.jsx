import '../ProfileComponenetCSS/userProfileCSS.css'
import React,{useState,useEffect} from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import socket from '../socket/socket';
function Userprofile(){
    const {id} = useParams();
    const navigate=useNavigate()
    const [userProfile,setProfileUser]=useState(null)
    const[user,setuser]=useState(JSON.parse(localStorage.getItem('user')))
    const [loding,setLoding]=useState(false)
    async function sendFollowRequest(e){
        const response=await fetch(`http://localhost:4000/api/auth/sendfollowrequest/${id}`,{
            method:'POST',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        localStorage.setItem('user',JSON.stringify(data.user))
        setuser(data.user)
    }

    useEffect(()=>{
      (async ()=>{
        setLoding(true)
        const response=await fetch(`http://localhost:4000/api/auth/getuserprofile/${id}`,{
           method:'GET',
           headers:{
            'x-auth-token':localStorage.getItem('token'),
            'Content-Type':'application/json'
           }
        })
        const data=await response.json()
        if(data.success){
            setProfileUser(data.userProfile)
        }else{
            navigate('/login')
        }
      })()
      setLoding(false)
    },[])

    if(!userProfile||loding){
        return (
            <h1>Loading....</h1>
        )
    }
    return (
        <div className="user-profile">
            <div className="user-info">
                <img src={userProfile.image} alt="User Avatar" className="avatar" />
                <h2>{userProfile.username}</h2>
                <button style={{backgroundColor: user.following.includes(id) ? 'green' : 'blue'}}
                 className="follow-button"
                  onClick={sendFollowRequest}
                 >{user.myRequests.includes(id) ? 'Requested' : user.following.includes(id) ? 'Following' : 'Follow'}</button>
                 <button className="create-reels-button"
                   onClickCapture={()=>navigate(`/userchat/${id}`)}
                 >message</button>
          <div className="follower-info">
              <p><Link to={`/followinguser/${id}`} className="followers-link">
              {userProfile.following.length} Following
         </Link></p>
         <p> <Link to={`/userfollowers/${id}`} className="followers-link">
          {userProfile.followers.length}   Followers
        </Link></p>
          </div>
            </div>
            <div className="user-posts">
                {
                    userProfile.posts.map((post)=>{
                        return (
                            <div className="user-post" key={post._id}>
                                <img src={post.post} alt="Post" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Userprofile