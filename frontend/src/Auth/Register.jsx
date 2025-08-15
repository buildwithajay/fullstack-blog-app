import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

const api = "http://localhost:5274"

const Register = () => {
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setIsLoading(true);

        
        if (!user.trim() || !email.trim() || !pass.trim()) {
            setError('All fields are required');
            setIsLoading(false);
            return;
        }

        if (!email.includes('@')) {
            setError('Please enter a valid email');
            setIsLoading(false);
            return;
        }

        if (pass.length < 6) {
            setError('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(api + "/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user, 
                    email: email,
                    password: pass
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                navigate("/login");
            } else {
                
                const errorData = await response.json().catch(() => null);
                if (response.status === 400) {
                    setError(errorData?.message || 'Invalid registration data');
                } else if (response.status === 409) {
                    setError('User already exists');
                } else {
                    setError('Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Network error. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div>
                    <label htmlFor="username" className="block text-sm font-medium mb-1">
                        Username
                    </label>
                    <input 
                        type="text" 
                        required
                        id='username'
                        placeholder='itsjohn'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input 
                        type="email" 
                        required
                        id='email'
                        placeholder='abc@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
            </form>

            <p className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                    onClick={() => navigate('/login')}
                    className="text-blue-500 hover:underline"
                >
                    Login here
                </button>
            </p>
        </div>
    )
}

export default Register