import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../StoryComponenetCSS/myStoryDetailsCSS.css'
function MyStoryDetails() {
    const navigate=useNavigate()
    const [stories,setStories]=useState(null)
    const [currentStoryIndex,setCurrentStoryIndex]=useState(0)
    const [showComments,setShowComments]=useState(false)
    const [loding,setLoding]=useState(false)
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
    useEffect(()=>{
       (async ()=>{
        setLoding(true)
         const response=await fetch("http://localhost:4000/api/story/getmystory",{
           method:'GET',
           headers:{
             'x-auth-token':localStorage.getItem('token'),
             'Content-Type':'application/json'
           }
         })  
         const data=await response.json()
         setStories(data.story)
       })()
       setLoding(false)
    },[])
    function handlePreviousStory(e){
        e.preventDefault()
        if(currentStoryIndex>0){
            setCurrentStoryIndex(currentStoryIndex-1)
        }
    }
    function handleNextStory(e){
        if(currentStoryIndex<stories.length-1){
            setCurrentStoryIndex(currentStoryIndex+1)
        }
    }
   async function deleteStory(e){
        e.preventDefault()
        const response=await fetch(`http://localhost:4000/api/story/removestory/${stories[currentStoryIndex]._id}`,{
            method:'DELETE',
            headers:{
                'x-auth-token':localStorage.getItem('token'),
                'Content-Type':'application/json'
            }
        })
        const data=await response.json()
        if(data.success){
            window.location.reload()
        }
    }
    function HandleNavigate(id){
      return function navigateProfile(){
      if(id==user._id){
        navigate('/myprofile')
      }else{
        navigate(`/userprofile/${id}`)
      }
    }
    }

    if(!stories||loding){
        return (
            <h3>loding</h3>
        )
    }

    return (
        <>
      {
        stories.length===0?<h1>No stories</h1>:
     <div className="story-viewer-details">
      <div className="story-details">
      <div className="my-story-image-div">
         <img src={stories[currentStoryIndex].story} alt="Story" />
      </div>
      <div className="my-story-navigation-details">
        <button onClick={handlePreviousStory}>Previous</button>
        <button onClick={handleNextStory}>Next</button>
      </div>
       <div className="story-actions-details">
          <button onClick={deleteStory} >Delete</button>
          <button onClick={()=>setShowComments(!showComments)}>Comments</button>
        </div>
        {showComments && (
  <div className="comments-details-details">
    <h3>Comments</h3>
    <ul className="my-story-comment-list">
      {stories[currentStoryIndex].comments.map((comment, index) => (
        <li key={index}>
          <div className="my-comment-item">
            <img src={comment.userId.image} alt="User Profile" className="comment-user-profile-image"
              onClick={() => navigate(`/userprofile/${comment.userId._id}`)}
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
)}
       </div>
    </div>
  }
</>
    )
}

export default MyStoryDetails