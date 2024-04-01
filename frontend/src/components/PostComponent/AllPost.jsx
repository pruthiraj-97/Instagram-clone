import React, { useState } from "react";
import '../PostComponentCSS/AllPost.css'
import { FaComment } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import {FaTrash}  from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";
function AllPost({post}){
    const navigate=useNavigate()
    const [Post,setPost]=useState(post)
    const[user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [showComments,setShowComments]=useState(false)
    const [newComment,setNewComment]=useState("")
    async function HandleLike(e){
       e.preventDefault()
       const response=await fetch(`http://localhost:4000/api/posts/likepost/${post._id}`,{
         method:'POST',
         headers:{
           'x-auth-token':localStorage.getItem('token'),
           'Content-Type':'application/json'
         }
       })
       const data=await response.json()
       setPost(data.post)
    }  
    async function HandleDislike(e){
       e.preventDefault()
       const response=await fetch(`http://localhost:4000/api/posts/dislikepost/${post._id}`,{
        method:'POST',
        headers:{
          'x-auth-token':localStorage.getItem('token'),
          'Content-Type':'application/json'
        }
      })
      const data=await response.json()
      setPost(data.post)
    }

    async function handleAddComment(e){
      e.preventDefault()
      if(!newComment){
        return
      }
      const response=await fetch(`http://localhost:4000/api/comments/addcomment/${post._id}`,{
        method:'POST',
        headers:{
          'x-auth-token':localStorage.getItem('token'),
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          comment:newComment
        })
      })
      const data=await response.json()
      setPost(data.post)
      setNewComment("")
    }
     
    function HandleUserprofile(e){
      e.preventDefault()
      if(post.userId._id===user._id){
        navigate('/myprofile')
      }else{
        navigate(`/userprofile/${post.userId._id}`)
      }
    }

    async function handleDeleteComment(commentId){
      const response=await fetch(`http://localhost:4000/api/comments/deletecomment/${commentId}`,{
         method:'DELETE',
         headers:{
           'x-auth-token':localStorage.getItem('token'),
           'Content-Type':'application/json'
         }
      })
      const data=await response.json()
      setPost(data.post)
    }
    

    return (
        <div className="post">
        <div className="user-profile-image">
          <img src={post.userId.image} alt="User Profile" 
           onClick={HandleUserprofile}
          />
       <Link>{post.userId.username}</Link>
       </div>
       <div className="post-image">
       <img src={post.post} alt="Post" />
       </div>
     <div className="post-actions">
     <div>
       <AiFillLike
         style={{ color:Post.likes.includes(user._id)? 'red':'black', cursor: 'pointer' }}
         onClick={HandleLike}
       />
       <span>{Post.likes.length} likes</span> 
     </div>
     <div>
       <AiFillDislike
         style={{ color:Post.dislikes.includes(user._id) ? 'red' : 'black', cursor: 'pointer' }}
         onClick={HandleDislike}
       />
       <span>Dislikes</span>

     </div>
     <div>
       <FaComment className="comment"
         onClick={()=>setShowComments(!showComments)}
       />
       <span>{Post.comments.length} Comments</span>
     </div>
   </div>
   {showComments &&
  <div className="comments-section">
    <input
      type="text"
      placeholder="Add a comment..."
      onChange={(e) => setNewComment(e.target.value)}
      value={newComment}
      className="input-comment"
    />
    <button onClick={handleAddComment}
      className="add-comment-button"
    >Add Comment</button>
    <ul>
      {showComments&&Post.comments.map((comment, index) => (
        <li key={index}>
          <div className="comment-item">
            <img src={comment.userId.image} alt="User Profile" className="comment-user-profile-image"
              onClick={() => comment.userId._id==user._id?navigate(`/myprofile`)
              :navigate(`/userprofile/${comment.userId._id}`)}
            />
            <div className="comment-content">
              <span className="comment-user">
                {comment.userId.username}
              </span>
             <div className="comment-text-div">
             <span className="comment-text">{comment.comment}</span>
              {comment.userId._id === user._id && (
                <FaTrash className="my-delete-icon" onClick={() => handleDeleteComment(comment._id)} />
              )}
             </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
}

  </div> 
      
    )
}

export default AllPost