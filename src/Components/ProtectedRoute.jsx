import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'; 

const ProtectedRoute = ({ roles }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();  

  if (!user) {
   
    return <Navigate to="/" />;  
  }

  if (roles.includes(user.role)) {
    return <Outlet />;
  }

  // If the user's role is not authorized for the page, show a toast and don't navigate
  toast.error("You are not authorized to access this page.");
  return <Navigate to="/dashboard" state={{ from: location }} />;
};

export default ProtectedRoute;

