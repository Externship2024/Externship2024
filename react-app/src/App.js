import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { googleLogout, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './css/custom.css';

// import { useAuthStore } from "./auth/authStore";
import Home from './components/Home';
import Login from './auth/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const currentUser = useAuthStore((state) => state.currentUser);

  const [data, setData] = useState({
    contact:"",
    departure_time:"",
    departure_location:"",
    destination:"",
    needed_seats:0,
    cost_per_seat:0
  })

  useEffect(() => {
    fetch("https://externship2024backend.vercel.app/datatest").then((res) =>
      res.json().then((data) => {
        setData({
          status: data.status,
          name: data.name,
          contact: data.contact,
          from: data.from,
          to: data.to,
          pay: data.pay,
          seats: data.seats,
        });
      })
    );
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Home />
      ) : (
        //    <Router>
        //      <Routes>
        //        <Route path="/" element={<Home />} />
        //      </Routes>
        //    </Router>
        //  ) : (
        <Login onLogin={setIsLoggedIn} />
      )}
      {/* <Home /> */}
      testing
      {data.name}
    </>
  );
}

export default App;
