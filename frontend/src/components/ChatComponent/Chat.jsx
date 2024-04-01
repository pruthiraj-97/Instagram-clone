import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket/socket';
import {useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import './ChatCSS.css'
function Chat(){
  const {id}=useParams()
  const navigate=useNavigate()
  const [loding,setLoding]=useState(false)
  const [messages,setMessages]=useState([])
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')))
  const [sendmessage,setSendmessage]=useState(null)
  const [users,setUsers]=useState([])
  console.log(messages)
  useEffect(()=>{
    (async ()=>{
       setLoding(true)
       const response=await fetch(`http://localhost:4000/api/message/getmessage/${id}`,{
        method:'GET',
        headers:{
          'x-auth-token':localStorage.getItem('token')
        }
       })
       const data=await response.json()
       setMessages(data.messages)
       setLoding(false)
    })()
  },[])

  useEffect(()=>{
    socket.on('message', (message) => {
     addMessage(message);
    })
 },[socket])
  const chatContainerRef = useRef(null);
  async function HandleMessageSend(e){
    e.preventDefault()
    console.log(sendmessage)
    const response=await fetch(`http://localhost:4000/api/message/addmessage/${id}`,{
        method:'POST',
        headers:{
          'x-auth-token':localStorage.getItem('token'),
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          message:sendmessage
        })
    })
    const data=await response.json()
    setMessages(data.messages)
    setSendmessage("")
  }

  function addMessage(message){
    if(message.receiver._id==user._id&&message.sender._id==id){
       setMessages((prev)=>[...prev,message])
    }
  }
  function navigateUser(message){
    return ()=>{
        if(message.sender._id==user._id){
          navigate('/myprofile')
        }else{
          navigate(`/userprofile/${message.sender._id}`)
        }
    }
  }
  
  if(loding){
    return (
        <h2>loding</h2>
    )
  }

  return (
    <div className='whole-container'>
     <div className='chat-header'>
        <img src="" alt="" />
        <p></p>
     </div>
     <div className="chat-container" ref={chatContainerRef}>
       {messages&&messages.map((message, index) => (
         <>
          <div className={message.sender._id == user._id ? 'message-container2' : 'message-container1'}>
          <div className='message-image'
             onClick={navigateUser(message)}
          >
             <img src={message.sender._id == user._id ? user.image : message.receiver.image} alt="" />
          </div>
          <div className='message-containt'>
               {message.message}
          </div>
       </div>
         </>
       ))}
      
    </div>
    <div className="input-container">
    <input type="text" placeholder="Type your message..." className="message-input" 
      value={sendmessage}
      onChange={(e)=>setSendmessage(e.target.value)}
    />
    <button className="send-button"
      onClick={HandleMessageSend}
    >Send</button>
  </div>
  </div>
  );
}

export default Chat