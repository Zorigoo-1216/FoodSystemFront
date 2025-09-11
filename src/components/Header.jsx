// Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-12 rounded-full border-2 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Хоолны захиалга</h1>
              <p className="text-orange-100 text-sm">Тавтай морилно уу</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center">
            <nav className="flex items-center gap-1 bg-orange-400/20 rounded-full p-1">
              <Link
                to="/"
                className={`px-5 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                  isActive("/")
                    ? "bg-white text-orange-600 shadow-md font-semibold"
                    : "text-orange-100 hover:bg-orange-400/30 hover:text-white"
                }`}
              >
                🏠 Нүүр хуудас
              </Link>
              <Link
                to="/order"
                className={`px-5 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                  isActive("/order")
                    ? "bg-white text-orange-600 shadow-md font-semibold"
                    : "text-orange-100 hover:bg-orange-400/30 hover:text-white"
                }`}
              >
                🍔 Хоол захиалга
              </Link>
              <Link
                to="/manage"
                className={`px-5 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                  isActive("/manage")
                    ? "bg-white text-orange-600 shadow-md font-semibold"
                    : "text-orange-100 hover:bg-orange-400/30 hover:text-white"
                }`}
              >
                💰 Орлого авах
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
