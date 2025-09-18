import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserPlus, LogIn, Sparkles, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const api = "http://localhost:5274";

const Register = () => {
    const [user, setUser] = useState('');
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
        setIsLoading(true);

        if (!user.trim() || !email.trim() || !pass.trim() || !name.trim()) {
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
        let formData = new FormData();
        formData.append("fullName", name)
        formData.append("username", user)
        formData.append("email", email)
        formData.append("password", pass)
        formData.append("profilePicture", pic)


        try {
            const response = await fetch(api + "/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                body: formData
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
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 bg-indigo-200 rounded-full opacity-60 animate-bounce" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-40 right-10 w-24 h-24 bg-pink-200 rounded-full opacity-40 animate-bounce" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-cyan-200 rounded-full opacity-50 animate-bounce" style={{animationDelay: '1.5s'}}></div>
            </div>

            <div className="relative max-w-md w-full space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    {/* Logo */}
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform hover:scale-110 transition-all duration-300">
                        <Shield className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Join Our Community
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Create your account and start exploring
                    </p>
                </div>

                {/* Registration Form */}
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
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 hover:bg-white focus:bg-white"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        {/* full name field */}
                         <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    id="username"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 hover:bg-white focus:bg-white"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    id="email"
                                    placeholder="abc@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-300 hover:bg-white focus:bg-white"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        {/* profile picture field */}
                        <div className="space-y-2">
                            <label htmlFor="pic" className="block text-sm font-semibold text-gray-700">
                                Profile Picture
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
                                </div>
                                <input
                                    type="file"
                                    required
                                    id="pic"
                                    placeholder="abc@gmail.com"
                                    value={pic}
                                    onChange={(e) => setPic(e.target.value)}
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
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
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
                            <p className="text-xs text-gray-500 mt-1">
                                Password must be at least 6 characters long
                            </p>
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center pt-6 border-t border-gray-100">
                        <p className="text-gray-600 text-sm mb-3">
                            Already have an account?
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="group inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold text-sm transition-all duration-300 hover:scale-105"
                        >
                            <LogIn className="w-4 h-4 mr-1 group-hover:translate-x-0.5 transition-transform duration-300" />
                            Sign in here
                        </button>
                    </div>

                    {/* Features */}
                    <div className="pt-4">
                        <div className="flex items-center justify-center space-x-8 text-xs text-gray-500">
                            <div className="flex items-center">
                                <Shield className="w-3 h-3 mr-1" />
                                Secure
                            </div>
                            <div className="flex items-center">
                                <Sparkles className="w-3 h-3 mr-1" />
                                Free Forever
                            </div>
                            <div className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                Easy Setup
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        By creating an account, you agree to our Terms & Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;