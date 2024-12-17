import React, { useState } from 'react';
import './css/custom.css';

import { Container, Row, Col, Modal } from 'reactstrap';
import Home from './components/Home';

function App() {

  const[data, setdata] = useState({
    status:"test",
    name:"test",
    contact:"test",
    from:"test",
    to:"test",
    pay:0,
    seats:0
  })

  useEffect(() => {
    console.log("useEffect is running")
    fetch("https://externship2024backend.vercel.app/datatest").then((res) =>
      res.json().then((data) => {
        setdata({
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
      <Home />
      testing
      {data.name}
    </>
  );
}

export default App;
