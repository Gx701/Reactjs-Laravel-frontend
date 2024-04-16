import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';


export const PrivateRoute = ({ children }) => {
	const { token } = useAuth();

    const { state } = useLocation();

	return token && state?.logged ? children : <Navigate to='/login' />;
};