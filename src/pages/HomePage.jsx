// pages/HomePage.js
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-orange-500 mb-6">
          Тавтай морилно уу!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Манай сайтаас шилдэг хоолнуудыг захиалах боломжтой
        </p>
        <Link
          to="/order"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
        >
          Хоол захиалах
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
