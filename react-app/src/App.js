import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { googleLogout, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import './css/custom.css';

import Home from './components/Home';
import Login from './auth/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [data, setData] = useState({
    status: "test",
    name: "test",
    contact: "test",
    from: "test",
    to: "test",
    pay: 0,
    seats: 0
  })

  useEffect(() => {
    console.log("useEffect is running")
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
  console.log(data)

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
      testing
      {data.name}
    </>
  );
}

export default App;
