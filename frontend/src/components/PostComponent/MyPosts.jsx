import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../PostComponentCSS/MyPostsCSS.css'
function MyPost(){
    const [post,setPost]=useState(null)
    const [loading,setLoding]=useState(false)
    const id=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
      (async ()=>{
        setLoding(true)
        const response=await fetch(`http://localhost:4000/api/posts/getmypost/${id.id}`,{
            method:'GET',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        setPost(data.post)
        setLoding(false)
      })()
    },[])
    async function deletePost(e){
        e.preventDefault()
        const response=await fetch(`http://localhost:4000/api/posts/deletepost/${post._id}`,{
            method:'DELETE',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        
        if(data.success){
            navigate("/myprofile")
        }
    }

    if(!post||loading){
        return (
            <h1>loding....</h1>
        )
    }

    return (
    <div>
    <div className="my-post">
        <div className="my-post-content">
        <div className="my-post-details">
             <img src={post.post} alt="Post" />
        </div>
        <div className="my-post-likes">
            <p>Total Likes: {post.likes ? post.likes.length : 0}</p>
            <p>Total Dislikes: {post.dislikes ? post.dislikes.length : 0}</p>
            <button className="delete-button" onClick={deletePost}>Delete</button>
        </div>
        </div>
        <div className="my-comments">
            {post.comments.length > 0 ? post.comments.map((comment,index) => (
                <div key={comment.id} className="my-comment">
                    <img src={comment.userId.image} alt="User Avatar"
                        onClick={() => navigate(`/userprofile/${comment.userId._id}`)}
                    />
                    <div>
                        <p><strong>{comment.userId.username}</strong></p>
                        <p>{comment.comment}</p>
                    </div>
                </div>
            )) : <h4>No Comments</h4>}
        </div>
    </div>
</div>

    )
}

export default MyPost