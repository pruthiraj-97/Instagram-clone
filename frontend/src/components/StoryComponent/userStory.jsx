import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link,useNavigate } from "react-router-dom";
import { AiFillLike,AiFillDislike,AiOutlineComment } from "react-icons/ai"
import {FaComment,FaTrash} from "react-icons/fa";
import '../StoryComponenetCSS/userStoryCSS.css'
function Story(){
    const navigate=useNavigate()
    const {storyarray}=useParams()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    const [currentIndex,setCurrentIndex]=useState(0)
    const [stories,setStories]=useState([])
    const [loding,setLoading]=useState(false)
    const [showComments,setShowComments]=useState(false)
    const [comment,setNewComment]=useState(null)
    useEffect(()=>{
      let story=decodeURIComponent(storyarray)
      story=JSON.parse(story)
      setStories(story)
    },[])
    
    if(loding||stories.length===0){
        return (
            <h1>loding...</h1>
        )
    }

    function handlePreviousStory(e){
      e.preventDefault()
      if(currentIndex>0){
        setCurrentIndex(currentIndex-1)
      }
    }
    function handleNextStory(e){
      e.preventDefault()
      if(currentIndex<stories.length-1){
        setCurrentIndex(currentIndex+1)  
      }
    }

    async function likeComment(e){
      e.preventDefault()
      const response=await fetch(`http://localhost:4000/api/story/likestory/${stories[currentIndex]._id}`,{
         method:'POST',
         headers:{
           'x-auth-token':localStorage.getItem('token'),
           'Content-Type':'application/json'
         },
         body:JSON.stringify({
           userId:stories[currentIndex].userId
         })
      })
      const data=await response.json()
      if(data.success){
        setStories(data.stories)
      }else{
        navigate('/login')
      }
    }
    async function dislikeComment(e){
      e.preventDefault()
      const response=await fetch(`http://localhost:4000/api/story/dislikestory/${stories[currentIndex]._id}`,{
         method:'POST',
         headers:{
           'x-auth-token':localStorage.getItem('token'),
           'Content-Type':'application/json'
         },
         body:JSON.stringify({
          userId:stories[currentIndex].userId
        })
         
      })
      const data=await response.json()
       if(data.success){
        setStories(data.stories)
      }else{
        navigate('/login')
      }
    }

    async function handleAddComment(e){
      e.preventDefault()
      const response=await fetch(`http://localhost:4000/api/story/addcomment/${stories[currentIndex]._id}`,{
          method:'POST',
          headers:{
            'x-auth-token':localStorage.getItem('token'),
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            userId:stories[currentIndex].userId,
            comment
          })
      })
      const data=await response.json()
      setStories(data.stories)
      setNewComment("")
    }

    return (
  
        <div className="user-story-container">
          <div className="user-story-details">
            <img src={stories[currentIndex].userId.image} alt="" 
               onClick={()=>navigate(`/userprofile/${stories[currentIndex].userId._id}`)}
            />
            <p><Link>{stories[currentIndex].userId.username}</Link></p>
          </div>
          <div className="user-story">
      <div className="user-story-image">
      <img src={stories[currentIndex].story} alt=""/>
      </div>
      <div className="navigation-details">
        <button onClick={handlePreviousStory}>Previous</button>
        <button onClick={handleNextStory}>Next</button>
      </div>
    <div className="post-actions">
     <div>
       <AiFillLike
         style={{
          color: stories[currentIndex].likes.includes(user._id) ? 'red' : 'black',
          cursor: 'pointer'
        }}
         onClick={likeComment}
       />
       <span>{stories[currentIndex].likes.length} likes</span> 
     </div>
     <div>
       <AiFillDislike
         style={{
          color: stories[currentIndex].dislikes.includes(user._id) ? 'red' : 'black',
          cursor: 'pointer'
        }}
         onClick={dislikeComment}
       />
       <span>Dislikes</span>
     </div>
     <div>
       <FaComment className="comment"
         onClick={()=>setShowComments(!showComments)}
       />
       <span>{stories[currentIndex].comments.length} Comments</span>
     </div>
   </div>
    </div>
    { showComments&&<div className="comments-section">
    <input
    type="text"
    placeholder="Add a comment..."
    value={comment}
    onChange={(e) => setNewComment(e.target.value)}
  />
  <button onClick={handleAddComment}>Add Comment</button>
  <ul className="comment-list">
    {stories[currentIndex].comments.map((comment, index) => (
       <li key={index}>
       <div className="comment-item">
         <img src={comment.userId.image} alt="User Profile" className="comment-user-profile-image"
           onClick={() =>comment.userId._id==user._id?navigate(`/myprofile`)
           :navigate(`/userprofile/${comment.userId._id}`)}
         />
         <div className="comment-content">
           <span className="comment-user">
             {comment.userId.username}
           </span>
          <div className="comment-text-div">
          <span className="comment-text">{comment.comment}</span>
          </div>
         </div>
       </div>
     </li>
    ))}
  </ul>
</div>}
        </div>
      
    )   
}

export default Story