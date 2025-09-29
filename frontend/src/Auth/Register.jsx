import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserPlus, LogIn, AlertCircle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const api = "https://fullstack-blog-app-l5ph.onrender.com";

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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    {/* Logo */}
                    <div className="mx-auto w-16 h-16 bg-red-600 flex items-center justify-center shadow-md mb-6">
                        <span className="text-white font-bold text-2xl">N</span>
                    </div>
                    
                    <h2 className="text-4xl font-bold text-black mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Join NepalNiti today
                    </p>
                </div>

                {/* Registration Form */}
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
                        {/* Full Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-200"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

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
                                    placeholder="johndoe123"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-400 text-gray-900 transition-all duration-200"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    id="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    placeholder="Create a strong password"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
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
                            <p className="text-xs text-gray-500 mt-1">
                                Must be at least 6 characters
                            </p>
                        </div>

                        {/* Terms Agreement */}
                        <div className="bg-gray-50 p-4 border border-gray-200">
                            <p className="text-xs text-gray-600">
                                By creating an account, you agree to NepalNiti's{' '}
                                <a href="#" className="text-red-600 hover:text-red-700 font-medium">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-red-600 hover:text-red-700 font-medium">
                                    Privacy Policy
                                </a>
                            </p>
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
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5 mr-2" />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center pt-6 border-t border-gray-200">
                        <p className="text-gray-600 text-sm mb-3">
                            Already have an account?
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold text-sm transition-colors duration-200"
                        >
                            <LogIn className="w-4 h-4 mr-1" />
                            Sign in
                        </button>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="bg-gray-100 border border-gray-200 p-4">
                    <div className="flex items-start">
                        <Shield className="w-5 h-5 text-gray-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                Your Data is Protected
                            </h4>
                            <p className="text-xs text-gray-600">
                                We use industry-standard encryption to protect your personal information and never share your data with third parties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits */}
                <div className="bg-white border border-gray-200 p-6">
                    <h3 className="text-sm font-bold text-black mb-4">What you get with NepalNiti:</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">✓</span>
                            Access to breaking news and in-depth analysis
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">✓</span>
                            Personalized content recommendations
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">✓</span>
                            Comment on articles and join discussions
                        </li>
                        <li className="flex items-start">
                            <span className="text-red-600 mr-2">✓</span>
                            Save articles for later reading
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Register;