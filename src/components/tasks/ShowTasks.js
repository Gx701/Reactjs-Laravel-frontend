import './ShowTask.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ApiLink = 'http://127.0.0.1:8000/api-To-do';
const routeLink = '/tasks';
const endpoint = ApiLink + routeLink;

const ShowTasks = () => {
    const { token } = useAuth();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllTasks();
    }, []);

    const getAllTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error al obtener Tareas:', error);
            navigate('/', {
                replace: false,
                state: {
                    logged: false
                },
            });
        }
    };

    const deleteTask = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(endpoint + '/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getAllTasks();
        } catch (error) {
            console.error('Error al eliminar Tarea:', error);
        }
    };

    const handleEdit = (taskId) => {
        navigate(`/edit-task/${taskId}`, {
          state: {
            logged: true
          },
        });
    };

    const handleCreate = () => {
      navigate(`/create-task`, {
        state: {
          logged: true
        },
      });
  };

    return (
        <div className='taskstable'>
            <div className='d-grid gap-2 btnCreateTask'>
                <button onClick={() => handleCreate()} className='btn btn-success'>Create</button>
            </div>

            <table className='table table-striped'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id_task}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.completed === 1 ? 'Completed' : 'Pending'}</td>
                            <td>
                                <button onClick={() => handleEdit(task.id_task)} className='btn btn-warning'>Edit</button>
                                <button onClick={() => deleteTask(task.id_task)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowTasks;
