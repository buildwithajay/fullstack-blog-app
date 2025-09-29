import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, User, Lock, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, isAuthenticate, getUserFromToken } from './Auth';

const api = "https://fullstack-blog-app-l5ph.onrender.com";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const userData = async () => {
        const user = await getUserFromToken().role;
        
        const isAdmin = user.includes("Admin")
        const isManager = user.includes("Manager")

        if(isAuthenticate() && isAdmin || isManager){
           return navigate("/dashboard")
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    {/* Logo */}
                    <div className="mx-auto w-16 h-16 bg-red-600 flex items-center justify-center shadow-md mb-6">
                        <span className="text-white font-bold text-2xl">N</span>
                    </div>
                    
                    <h2 className="text-4xl font-bold text-black mb-2">
                        Sign In
                    </h2>
                    <p className="text-gray-600 text-lg">
                        to continue to NepalNiti
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white shadow-sm border border-gray-200 p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-600 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-5 w-5 text-red-600" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-800 font-medium">{error}</p>
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
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    id="username"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-200"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-200"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <a href="#" className="text-red-600 hover:text-red-700 font-medium">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-semibold text-white transition-colors duration-200 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-red-600 hover:bg-red-700'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5 mr-2" />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="text-center pt-6 border-t border-gray-200">
                        <p className="text-gray-600 text-sm mb-3">
                            Don't have an account?
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold text-sm transition-colors duration-200"
                        >
                            <UserPlus className="w-4 h-4 mr-1" />
                            Create an account
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-100 border border-gray-200 p-4">
                    <div className="flex items-start">
                        <Lock className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                Secure Login
                            </h4>
                            <p className="text-xs text-gray-600">
                                Your connection is encrypted and your credentials are protected with industry-standard security.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;