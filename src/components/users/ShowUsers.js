import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ApiLink = 'http://127.0.0.1:8000/api-To-do'
const routeLink = '/users'
const endpoint = ApiLink+routeLink

const ShowUsers = () => {
    const [ users, setUsers ] = useState( [] )

    useEffect ( ()=> {
      getAllUsers()
  }, [])

  const getAllUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token almacenado en localStorage
      const response = await axios.get(endpoint);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token almacenado en localStorage
      await axios.delete(endpoint + '/' + id);
      getAllUsers();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div>
        <div className='d-grid gap-2'>
            <Link to="/create-user" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
        </div>

        <table className='table table-striped'>
            <thead className='bg-primary text-white'>
                <tr>
                    <th>Username</th>
                    <th>E-mail</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { users.map( (user) => (
                    <tr key={user.id}>
                        <td> {user.name} </td>    
                        <td> {user.email} </td>    
                        <td>
                            <Link to={`/edit-user/${user.id}`} className='btn btn-warning'>Edit</Link>
                            <button onClick={ ()=>deleteUser(user.id) } className='btn btn-danger'>Delete</button>
                        </td>

                    </tr>
                )) }
            </tbody>
        </table>
    </div>
  )
}

export default ShowUsers
