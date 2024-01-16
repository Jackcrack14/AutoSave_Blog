import React from 'react'
import PostList from './PostList'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/reducers/authReducer'
export default function Home({posts}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  

  
  const handleLogout = () => {
    navigate('/login')
    dispatch(logout())
  }
  // console.log(user)
  return (
    <div>
        <h1>MERN Autosave Blog</h1>
        <button onClick={() => navigate('/add')}>Add Post</button>
        <PostList posts={posts} />
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
