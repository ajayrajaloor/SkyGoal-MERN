// Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      console.log('Login successful:', response.data);
      localStorage.setItem('UserAuth', response.data.token);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        // Unauthorized - invalid email or password
        setError('password', { type: 'manual', message: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            {...register('email', { required: 'Email is required' })}
            className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            {...register('password', { required: 'Password is required' })}
            className={`mt-1 p-2 w-full border rounded-md ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <div className='flex justify-center'>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4  rounded-md hover:bg-green-600"
          >
            Login
          </button>
        </div>
      </form>
      <p className="text-sm mt-4">
        No Account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
