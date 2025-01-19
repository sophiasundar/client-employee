import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../Redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(action)) {
        toast.success('Login successful!');
      }
    } catch (err) {
      toast.error('Login failed!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded" disabled={loading}
           onClick={() => navigate('/dashboard')}
        >
          {loading ? 'Logging in...' : 'Login'}
          
        </button>
        <p className="text-ascent-2 text-sm text-center mt-0">
          Don't have an account? 
          <Link to='/register' className="text-[#065ad8] font-semibold ml-2 cursor-pointer">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
