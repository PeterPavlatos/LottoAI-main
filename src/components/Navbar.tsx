import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Brain, LogIn, LogOut, User, Settings } from 'lucide-react';

export function Navbar() {
  const { user, logout, credits } = useAuthStore();
  const userType = credits > 0 ? 'Premium' : 'Free';

  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {user ? (
          <div className="flex items-center space-x-2 text-xl font-bold">
            <Brain size={24} />
            <span>LottoAI</span>
          </div>
        ) : (
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Brain size={24} />
            <span>LottoAI</span>
          </Link>
        )}
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-200 flex items-center space-x-1">
                <User size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/profile" className="hover:text-indigo-200 flex items-center space-x-1">
                <Settings size={18} />
                <span>Profile</span>
              </Link>
              <div className="px-3 py-1 rounded-full bg-indigo-500 text-sm">
                {userType} User
              </div>
              <button
                onClick={() => logout()}
                className="hover:text-indigo-200 flex items-center space-x-1"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-indigo-200 flex items-center space-x-1">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition flex items-center space-x-1"
              >
                <User size={18} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}