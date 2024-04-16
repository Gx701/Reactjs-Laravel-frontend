import axios from "axios";
import React, {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";

const ApiLink = 'http://127.0.0.1:8000/api-To-do'
const routeLink = '/users'
const endpoint = ApiLink+routeLink

const EditUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setRePassword] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    const update = async (e) => {
        e.preventDefault()
        await axios.put(endpoint+'/'+id, 
        {
            name: name, 
            email: email, 
            password: password
        })
        navigate('/users')
    }
    
    useEffect( () =>{
        const getUserById = async () => {
            const response = await axios.get(endpoint+'/'+id)
            setName(response.data.name)
            setEmail(response.data.email)
            setPassword(response.data.password)
        }
        getUserById()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return (
        <div>
        <h3>Edit User</h3>
        <form onSubmit={update}>
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
            <button type='submit' className='btn btn-primary'>Update</button>
        </form>
    </div>
    )
}

export default EditUser

