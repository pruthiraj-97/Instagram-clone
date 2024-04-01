import '../PostComponentCSS/AddPostCSS.css'
import React, { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
function AddPost(){
    const navigate=useNavigate()
    const [file,setFile]=useState(null)
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [loding,setLoding]=useState(false)
    const createPost= async (e)=>{
        e.preventDefault()
        setLoding(true)
        console.log(file)
          try {
            const formData = new FormData();
            formData.append('post', file);
            formData.append('title', title);
            formData.append('description', description);
            const response=await fetch("http://localhost:4000/api/posts/createpost",{
              method: 'POST',
              headers: {
                'x-auth-token': localStorage.getItem('token')
              },
              body: formData
            })
            const data=await response.json()
            
            if(data.success){
              navigate("/myprofile")
            }
          } catch (error) {
            navigate('/login')
          }
    }
    return (
      <div className="add-post-container">
      <h2>Add New Post</h2>
      <form onSubmit={createPost}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload File:</label>
          <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])} />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
    )
}
export default AddPost