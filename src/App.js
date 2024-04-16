import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/Auth/AuthContext';
import { PrivateRoute, PrivateRouteWithID } from './Router/PrivateRoute';

//importar componentes users
import ShowUsers from './components/users/ShowUsers';
import CreateUser from './components/users/CreateUser';
import EditUser from './components/users/EditUser';
import Login from './components/Login/Login';

//importar componentes tasks
import ShowTasks from './components/tasks/ShowTasks';
import EditTask from './components/tasks/EditTask';
import CreateTask from './components/tasks/CreateTask';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path='/login' element={ <Login/> } />
//           <Route path='/users' element={ <ShowUsers/> } />
//           <Route path='/create-user' element={ <CreateUser/> } />
//           <Route path='/edit-user/:id' element={ <EditUser/> } />
//         </Routes>
//       </BrowserRouter>     
//     </div>
//   );
// }

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/users' element={ <ShowUsers/> } />
          <Route path='/create-user' element={ <CreateUser/> } />
          <Route path='/edit-user/:id' element={ <EditUser/> } />

          <Route path="/login" element={<Login />} />
          <Route path='/tasks' element={<PrivateRoute> <ShowTasks /> </PrivateRoute> }/>
          <Route path='/edit-task/:id' element={<PrivateRoute> <EditTask /> </PrivateRoute> }/>
          <Route path='/create-task/' element={<PrivateRoute> <CreateTask /> </PrivateRoute> }/>
        </Routes>
      </Router>
    </AuthProvider>
  );
};


export default App;
