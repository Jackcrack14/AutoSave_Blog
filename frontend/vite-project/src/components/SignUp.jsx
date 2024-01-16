import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/reducers/authReducer'

export default function () {
    const [user,setUser] = useState({name:'',email:'',password:''})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async() => {
        const {name, email, password} = user
        if(!name || !email || !password) {
            throw new Error('Enter all fields')
            return
        }
        const response = await fetch('http://localhost:5000/users/',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:name,email:email,password:password})
        })
        const data = await response.json()
        dispatch(registerUser(data))
        navigate('/posts')
    }
    const handleLogin = () =>{
        navigate('/login')
    }
  return (
    <div>
        <input type='text' placeholder='Enter Name' onChange={(e) => setUser({...user,name:e.target.value})}/>
        <input type='text' placeholder='Enter Email' onChange={(e) => setUser({...user,email:e.target.value})}/>
        <input type='password' placeholder='Enter PassWord' onChange={(e) => setUser({...user,password:e.target.value})}/>
        <button onClick={handleSubmit}>SignUp</button>
        <button onClick={handleLogin}>Login</button>
    </div>
  )
}
