import { method } from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {login} from '../redux/reducers/authReducer'

export default function Login () {
    const [user, setUser] = useState({email:'',password:''})
    const dispatch = useDispatch()
    // const curUser = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const handleSubmit = async () => {
        if(!user.email || !user.password){
            throw new Error('Please Enter all fields')
            return
        }
        const response = await fetch('http://localhost:5000/users/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(user)})
        const data = await response.json()
        dispatch(login(data))
        navigate('/posts')
    }
    const handleSignUp = () => {
      navigate('/')
    }
  return (
    <div>
        <input type='text' placeholder='Enter email' onChange={(e) => setUser({...user, email:e.target.value})}/>
        <input type='password' placeholder='Enter Password' onChange={(e) => setUser({...user,password:e.target.value})}/>
        <button onClick={handleSubmit}>Login</button>
        <button onClick={handleSignUp}>SignUp</button>
    </div>
  )
}
