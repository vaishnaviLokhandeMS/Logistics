import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);  // Track success or failure
  const navigate = useNavigate();  // Initialize useNavigate for redirection

  const handleSignup = async (newUser) => {
    const query = new URLSearchParams({
      fullName: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      location: newUser.address,
      password: newUser.password,
    }).toString();

    try {
      const response = await fetch(`http://localhost:5000/api/users/signup?${query}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setMessage('Account created successfully!');
        
        // Redirect to login-user page after a short delay
        setTimeout(() => {
          navigate('/login-user');  // Redirect to the login-user page
        }, 2000);  // 2-second delay before redirecting
      } else {
        setIsSuccess(false);
        setMessage(`Signup failed: ${data.error}`);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage('Signup failed. Please try again.');
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      phone,
      address,
      password,
    };
    handleSignup(newUser);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border border-gray-600 bg-gray-700 rounded-lg text-white"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-4 rounded-lg">
            Create Account
          </button>
        </form>
        {/* Success message in green, failure message in red */}
        {message && (
          <p className={`text-center mt-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Signup;
