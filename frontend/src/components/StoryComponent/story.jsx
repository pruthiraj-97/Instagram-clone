import React,{useState,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom"
import '../StoryComponenetCSS/story.css'
function StoryCompo(){
    const [story,setStory]=useState({}) 
    const navigate=useNavigate()
    useEffect(()=>{
      (async ()=>{
        const response=await fetch("http://localhost:4000/api/story/getstory",{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
         })
        const data=await response.json()
        setStory(data.story)
      })()
    },[])
    function allStory(allstory){
    return function showStory(e){
      e.preventDefault()
      let newstory=JSON.stringify(allstory)
      navigate(`story/${encodeURIComponent(newstory)}`)
    }
  }

    return (
      <div className="story-container-user">
    {Object.keys(story).length > 0 ? (
     Object.keys(story).map((s, index) => (
      <div className="story-user" key={index}>
        <div className="story-image-container-user" onClick={allStory(story[s])}>
          <img src={story[s][0].userId.image} alt={`Story ${index}`}  />
        </div>
        <p className="username-user">{story[s][0].userId.username}</p>
      </div>
    ))
    ) : (
    <h3 className="no-stories">No stories available</h3>
  )}
</div>

  )
}
export default StoryCompo