import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const[data,setData]=useState([]);
  async function get(){
    const response = await fetch("https://personal-blog-ibriz.onrender.com/users");
    const jsonData = await response.json();
    setData(jsonData);
  }

  useEffect(() => {
    get();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data.map((d:any) => <li>{d.firstName}</li>)}
        </p>
      </header>
    </div>
  );
}

export default App;
