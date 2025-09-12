import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, LogIn, UserPlus, Mail, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, isAuthenticate, getUserFromToken } from './Auth';

const api = "http://localhost:5274";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userData =async ()=>{
            const user =await  getUserFromToken().role;
            
            const isAdmin = user.includes("Admin")
            const isManager = user.includes("Manager")

            if(isAuthenticate() && isAdmin || isManager){
               return  navigate("/dashboard")
            }
            else if(isAuthenticate()){
               return navigate("/blogs")
            }
    }

    
 

    useEffect(() => {
       if(isAuthenticate()){
        navigate("/dashboard")
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
            userData()
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-40 right-10 w-24 h-24 bg-pink-200 rounded-full opacity-40 animate-bounce" style={{animationDelay: '0.5s'}}></div>
            </div>

            <div className="relative max-w-md w-full space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    {/* Logo */}
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-all duration-300">
                        <Sparkles className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Sign in to continue your journey
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700 font-medium">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    id="username"
                                    placeholder="itsjohn"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 hover:bg-white focus:bg-white"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-12 pr-12 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 hover:bg-white focus:bg-white"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors duration-300"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center items-center py-4 px-6 border border-transparent text-lg font-semibold rounded-2xl text-white transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="text-center pt-6 border-t border-gray-100">
                        <p className="text-gray-600 text-sm mb-3">
                            Don't have an account yet?
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="group inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-sm transition-all duration-300 hover:scale-105"
                        >
                            <UserPlus className="w-4 h-4 mr-1 group-hover:translate-x-0.5 transition-transform duration-300" />
                            Create an account
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        Secure login powered by modern encryption
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;