import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const ApiLink = 'http://127.0.0.1:8000/api-To-do'
const routeLink = '/register/user'
const endpoint = ApiLink+routeLink

const CreateUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setRePassword] = useState('')
    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, {name: name, email: email, password: password, password_confirmation: password_confirmation})
        navigate('/users')
    }
    
  return (
    <div>
        <h3>Create User</h3>
        <form onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Username</label>
                <input 
                    value={name}
                    onChange={ (e)=> setName(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>E-mail</label>
                <input 
                    value={email}
                    onChange={ (e)=> setEmail(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Password</label>
                <input 
                    value={password}
                    onChange={ (e)=> setPassword(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Confirm Password</label>
                <input 
                    value={password_confirmation}
                    onChange={ (e)=> setRePassword(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <button type='submit' className='btn btn-primary'>Store</button>
        </form>
    </div>
  )
}

export default CreateUser