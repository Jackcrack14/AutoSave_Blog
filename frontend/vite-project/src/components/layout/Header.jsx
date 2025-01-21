import React, { useState } from "react";
import {
  PenSquare,
  Menu,
  X,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarMenu, setAvatarMenu] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <PenSquare className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Bloggify
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Home
            </a>
            <a
              href="/explore"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Explore
            </a>
            <a
              href="/bookmarks"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Bookmarks
            </a>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-300 hover:text-purple-400">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-300 hover:text-purple-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer ring-2 ring-purple-500 hover:ring-purple-400 transition-colors"
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 border border-gray-700 animate-fade-up">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-sm text-white font-medium">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>

                  <a
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                  >
                    <User className="w-4 h-4 mr-3" />
                    Your Profile
                  </a>

                  <a
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </a>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-purple-400"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <div className="px-4 py-3 space-y-3">
            <a href="/" className="block text-gray-300 hover:text-purple-400">
              Home
            </a>
            <a
              href="/explore"
              className="block text-gray-300 hover:text-purple-400"
            >
              Explore
            </a>
            <a
              href="/bookmarks"
              className="block text-gray-300 hover:text-purple-400"
            >
              Bookmarks
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
