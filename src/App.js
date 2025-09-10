// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FoodOrderPage from "./pages/FoodOrderPage";
import FoodManagePage from "./pages/FoodManagePage";
import { OrderProvider } from "./context/OrderContext";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="App flex flex-col h-screen">
          <Header />

          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/order" element={<FoodOrderPage />} />
              <Route path="/manage" element={<FoodManagePage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;
