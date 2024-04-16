import './CreateTaks.css'
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useAuth } from '../Auth/AuthContext';
import { useNavigate, useParams } from "react-router-dom";

const ApiLink = 'http://127.0.0.1:8000/api-To-do'
const routeLink = '/tasks'
const endpoint = ApiLink+routeLink

const CreateTask = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState('')
    const navigate = useNavigate()
    const { token } = useAuth();

    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, 
            {
                title: title, 
                description: description, 
                completed: completed
            },
            {
                headers: {
                    Authorization: `Bearer ${token}` // Agregar el token al encabezado Authorization
                }
            })
            navigate('/tasks', {
                state: {
                    logged: true
                },
            });
    }
    
  return (
    <div className='mainDivformCreateTask'>
        <h3 className='titleformCreateTask'>Create Task</h3>
        <form className='formCreateTask' onSubmit={store}>
            <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input 
                    value={title}
                    onChange={ (e)=> setTitle(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Description</label>
                <input 
                    value={description}
                    onChange={ (e)=> setDescription(e.target.value)}
                    type='text'
                    className='form-control'
                />
            </div>
            <div className='mb-3'>
                <label className='form-label'>Completed</label>
                <input 
                    checked={completed} // Cambio aquí
                    onChange={ (e)=> setCompleted(e.target.checked)} // Cambio aquí
                    type='checkbox'
                    className='form-check'
                />
            </div>
            <button type='submit' className='btn btn-primary'>Store</button>
        </form>
    </div>
  )
}

export default CreateTask