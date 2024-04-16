import './EditTask.css'
import axios from "axios";
import React, {useState, useEffect} from "react";
import { useAuth } from '../Auth/AuthContext';
import { useNavigate, useParams } from "react-router-dom";

const ApiLink = 'http://127.0.0.1:8000/api-To-do'
const routeLink = '/tasks'
const endpoint = ApiLink+routeLink

const EditTask = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState('')
    const { token } = useAuth();
    const {id} = useParams()
    const navigate = useNavigate()
    
    const update = async (e) => {
        e.preventDefault();
        const token2 = localStorage.getItem('token');
        await axios.put(endpoint+'/'+id, {
            title: title, 
            description: description, 
            completed: completed
        },
        {
            headers: {
                Authorization: `Bearer ${token2}` // Agregar el token al encabezado Authorization
            }
        });
        navigate('/tasks', {
			state: {
				logged: true
			},
		});
    }
    
    useEffect( () =>{
        
        const getTaskById = async () => {
            try
            {
                const token = localStorage.getItem('token');
                const response = await axios.get(endpoint+'/'+id, {
                    headers: {
                    Authorization: `Bearer ${token}` // Agregar el token al encabezado Authorization
                    }
                });
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
            }
            catch (error)
            {
                console.error('Error al obtener Tarea:', error);
                navigate('/', {
                    replace: false,
                    state: {
                        logged: false
                    },
                });
            }
        }
        getTaskById();
    }, [] )

    return (
        <div>
            <div className='mainDivformCreateTask'>
            <h3 className='titleformCreateTask'>Edit Task</h3>
        <form className='formCreateTask' onSubmit={update}>
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
            <button type='submit' className='btn btn-primary'>Update</button>
        </form>
            </div>   
        
         </div>
    )
}

export default EditTask

