import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/HomeComponent/Home.jsx'
import Login from './components/AuthComponent/login'
import SignUp from './components/AuthComponent/signup'
import Profile from './components/ProfileComponent/profile'
import AddPost from './components/PostComponent/AddPost.jsx'
import MyPost from './components/PostComponent/MyPosts.jsx'
import Userprofile from './components/ProfileComponent/userProfile.jsx'
import Notification from './components/Notification/followNotification.jsx'
import AddStory from './components/StoryComponent/AddStory.jsx'
import MyStoryDetails from './components/StoryComponent/MyStoryDetails.jsx'
import Story from './components/StoryComponent/userStory.jsx'
import Following from './components/Notification/followingComponent.jsx'
import Followers from './components/Notification/FollowerComponent.jsx'
import FollowingCompoUser from './components/Notification/FollowingCompoUser.jsx'
import Chat from './components/ChatComponent/Chat.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/'>
         <Route path='' element={<Home/>}/>
         <Route path='login' element={<Login/>}/>
         <Route path='signup' element={<SignUp/>}/>
         <Route path='myprofile'>
           <Route path='' element={<Profile/>}/>
           <Route path='addpost' element={<AddPost/>}/>
           <Route path='mypost/:id' element={<MyPost/>}/>
           <Route path='notification' element={<Notification/>}/>
           <Route path='addstory' element={<AddStory/>}/>
           <Route path='mystory' element={<MyStoryDetails/>}/>
         </Route>
         <Route path='userprofile/:id' element={<Userprofile/>}/>
         <Route path='story/:storyarray' element={<Story/>}/>
         <Route path='userfollowing/:id' element={<Following/>}/>
         <Route path='userfollowers/:id' element={<Followers/>}/>
         <Route path='followinguser/:id' element={<FollowingCompoUser/>}/>
         <Route path='userchat/:id' element={<Chat/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
)
