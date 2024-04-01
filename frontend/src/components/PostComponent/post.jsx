import React,{useState,useEffect} from "react";
import Post from "./posts";
import socket from '../socket/socket';
import { useNavigate } from "react-router-dom";
function PostCompo(){
    const navigate=useNavigate()
    const [posts,setPosts]=useState([])
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    useEffect(()=>{
       (async ()=>{
        const response=await fetch("http://localhost:4000/api/posts/getmyposts",{
            method:'GET',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
         if(data.success){
         const data=await response.json()
         setPosts(data.posts)
         }else{
            navigate('/login')
         }
       })()
    },[])
    
    return (
        <>
        {
            posts.length>0&&
             posts.map((p)=>{
               return <Post key={p._id} id={p._id} image={p.image} title={p.title} likes={p.likes} dislikes={p.dislikes} comments={p.comments}/>
             })
        }
       </>
    )
}

export default PostCompo