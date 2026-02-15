import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { Bookmark, Share2, Shield, Zap } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 transform -translate-x-1/2"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-indigo-600 mb-4 animate-fade-in-up">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            v2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900">
            Organize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">web life</span>.
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A simple, elegant way to save, manage, and access your favorite links from any device. Real-time synchronization included.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {user ? (
              <button
                onClick={() => navigate('/bookmarklist')}
                className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-1"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate('/register')}
                  className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-200 transform hover:-translate-y-1"
                >
                  Get Started for Free
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 rounded-2xl bg-white text-gray-700 font-semibold text-lg border border-gray-200 hover:bg-gray-50 transition shadow-sm hover:shadow-md"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto relative z-10">
          <FeatureCard
            icon={<Zap className="text-yellow-500" size={32} />}
            title="Real-Time Sync"
            description="Your bookmarks update instantly across all your open tabs and devices."
          />
          <FeatureCard
            icon={<Shield className="text-green-500" size={32} />}
            title="Secure Storage"
            description="Your data is safely stored in the cloud, accessible only to you."
          />
          <FeatureCard
            icon={<Share2 className="text-blue-500" size={32} />}
            title="Easy Sharing"
            description="Organize your links and keep your digital workspace clutter-free."
          />
        </div>
      </main>

      <footer className="py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BookmarkApp. Built with ❤️.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition duration-300 text-left group">
    <div className="mb-4 p-3 bg-gray-50 rounded-xl w-fit group-hover:scale-110 transition duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

export default Home;
