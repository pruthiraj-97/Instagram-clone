import React,{useState,useEffect} from "react";
import AllPost from "./AllPost";
import socket from "../socket/socket";
import { useNavigate } from "react-router-dom";
function Post(){
    const [posts,setPosts]=useState([])
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const navigate=useNavigate()
    useEffect(()=>{
      (async ()=>{
        const response=await fetch("http://localhost:4000/api/posts/getposts",{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        })
        const data=await response.json()
        if(data.success){
        setPosts(data.posts)
        socket.connect()
        socket.emit('setUserId',user._id)
        }else{
          navigate('/login')
        }
      })()
    },[])
    return (
       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
       {
         posts.length>0&&posts.map((post,index)=>{
            return <AllPost key={index} post={post}/>
         })
         
       }
     </div>
    )
}

export default Post
