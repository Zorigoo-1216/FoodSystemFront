// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodOrderPage from "./pages/FoodOrderPage";
import { OrderProvider } from "./context/OrderContext";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="App flex flex-col h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/order" element={<FoodOrderPage />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;
