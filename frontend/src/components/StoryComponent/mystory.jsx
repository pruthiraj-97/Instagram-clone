import React,{useState,useEffect} from "react";
import { MdAddComment, MdAccountCircle } from 'react-icons/md';
import { Link ,useNavigate} from "react-router-dom";
import '../StoryComponenetCSS/mystory.css'
function MyStory() {
  const [story,setStory]=useState([])
  const navigate=useNavigate()
  const [loading, setLoading] = useState(false);
   useEffect(()=>{
     (async ()=>{
      setLoading(true)
       const response=await fetch("http://localhost:4000/api/story/getmystory",{
          method:'GET',
          headers:{
            'x-auth-token':localStorage.getItem('token'),
            'Content-Type':'application/json'
          }
       })
       const data=await response.json()
       if(!data.success){
        navigate("/login")
       }
       setStory(data.story)
       setLoading(false)
     })()
   },[])
    if(loading){
      return ( 
        <h1>loding...</h1>
      )
    }
    
    return (
      <div className="my-story-image-container">
      <div className="mystory-image">
      <img src={story.length>0?story[0].story:"https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-plus-icon-png-image_533007.jpg"}
        alt="Story"
        className="story-image"
        onClick={() => navigate('/myprofile/mystory')}
      />
      </div>
      <p><Link to={'/login'}>login</Link></p>
    </div>
    )
}

export default MyStory