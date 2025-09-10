// Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-orange-500 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Title */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🍜 Хоолны захиалга
        </h1>

        {/* Navigation */}
        <nav className="flex gap-4">
          <Link
            to="/"
            className="text-white hover:bg-orange-600 px-3 py-1 rounded transition"
          >
            Нүүр хуудас
          </Link>
          <Link
            to="/order"
            className="text-white hover:bg-orange-600 px-3 py-1 rounded transition"
          >
            Хоол захиалга
          </Link>
          <Link
            to="/manage"
            className="text-white hover:bg-orange-600 px-3 py-1 rounded transition"
          >
            Орлого авах
          </Link>
        </nav>

        {/* Login Button */}
        <button className="bg-white text-orange-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-100 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <span>Нэвтрэх</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
