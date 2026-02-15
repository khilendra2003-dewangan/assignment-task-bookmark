import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="z-10 text-center space-y-8 p-10 bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl max-w-lg w-full">
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Bookmark App
        </h1>
        <p className="text-lg text-gray-300 font-light">
          this is the bookmark application
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition duration-300 font-semibold text-lg shadow-lg"
          >
            Login
          </button>
          <button
             onClick={() => navigate('/register')}
            className="w-full py-3 px-6 rounded-xl bg-transparent border-2 border-purple-500 hover:bg-purple-500/20 transform hover:-translate-y-1 transition duration-300 font-semibold text-lg text-purple-400 hover:text-white shadow-lg"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
