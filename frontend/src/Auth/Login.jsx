import React, { useState, useEffect } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { setAuthToken, isAuthenticate } from './Auth';

const api = "http://localhost:5274"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        if (isAuthenticate()) {
            navigate('/create');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username.trim() || !password.trim()) {
            setError('Email and password are required');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(api + "/account/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                
                if (data.token) {
                    setAuthToken(data.token);
                    navigate("/dashboard"); 
                } else {
                    setError('Login successful but no token received');
                }
            } else {
                const errorData = await response.json().catch(() => null);
                if (response.status === 401) {
                    setError('Invalid username or password');
                } else if (response.status === 400) {
                    setError(errorData?.message || 'Invalid login data');
                } else {
                    setError('Login failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <label htmlFor="text" className="block text-sm font-medium mb-1">
                        Username
                    </label>
                    <input 
                        type="text" 
                        required
                        id='username'
                        placeholder='itsjohn'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                        disabled={isLoading}
                    />
                </div>
          
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <div className='relative'>
                        <input 
                            type={showPassword ? "text" : "password"}
                            required
                            id="password" 
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 pr-10'
                            disabled={isLoading}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                </div>

                <button 
                    type='submit' 
                    disabled={isLoading}
                    className={`w-full py-2 px-4 rounded font-medium ${
                        isLoading 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
                Don't have an account?{' '}
                <button 
                    onClick={() => navigate('/register')}
                    className="text-blue-500 hover:underline"
                >
                    Register here
                </button>
            </p>
        </div>
    )
}

export default Login