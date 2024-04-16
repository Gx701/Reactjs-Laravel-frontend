import axios from 'axios'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'
import { useAuth } from '../Auth/AuthContext';

const ApiLink = 'http://127.0.0.1:8000/api-To-do'
const routeLink = '/login/user'
const endpoint = ApiLink+routeLink

const LoginUser = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth();

    const Login = async (e) => {
        e.preventDefault()
        try {
          const response = await axios.post(endpoint, { email, password });
          const token = response.data.access_token;
          login(token); // Almacena el token en localStorage
          navigate('/tasks', {
			state: {
				logged: true
			},
		}); // Redirige a la página de tareas después de iniciar sesión
        } catch (error) {
          console.error(error);
        }
      };
    
  return (
    <div>
        {/* <h3>Login</h3>
        <form className='loginForm' onSubmit={login}>
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
            <button type='submit' className='btn btn-primary'>login</button>
        </form> */}
        <div className="container">
        <div className="body d-md-flex align-items-center justify-content-between">
            <div className="box-1 mt-md-0 mt-5">
                <img src="https://bs-uploads.toptal.io/blackfish-uploads/uploaded_file/file/191791/image-1582329433118-623eeeb89c50ec545990667e9cbebb41.png"/>
            </div>
            <div className="box-2 d-flex flex-column h-100">
                <div className="mt-5">
                    <p className="mb-1 h-1">Login.</p>
                    <p className="text-muted mb-2">Type Your Credentials.</p>
                    <form className="d-flex flex-column" onSubmit={Login}>
                        <p className="text-muted mb-2">Email</p>
                           <input 
                                value={email}
                                onChange={ (e)=> setEmail(e.target.value)}
                                type='text'
                                className='form-control'
                            />
                        <p className="text-muted mb-2">Password</p>
                        <input  
                            value={password}
                            onChange={ (e)=> setPassword(e.target.value)}
                            type='password'
                            className='form-control'
                        />
                        <div className="mt-3">
                        <button type='submit' className='btn btn-primary'>Login</button>
                        </div>
                    </form>
                </div>
                <div className="mt-auto">
                    <p className="footer text-muted mb-0 mt-md-0 mt-4">By register you agree with our
                        <span className="p-color me-1"> terms and conditions</span>and
                        <span className="p-color ms-1">privacy policy</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default LoginUser