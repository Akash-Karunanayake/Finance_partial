import React, { useEffect, useState } from 'react';
import Navbar from "./NavBarFinance";
import './FinanceCSS/DisplayDatabase.css';


function FinanceHome() {

  const [greeting, setGreeting] = useState("");
 

  useEffect(() => {
  
    //greeting text
    const hour = new Date().getHours();
    if (hour >= 3 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour >= 12 && hour < 16) {
      setGreeting("Good Afternoon");
    } else if (hour>=16 && hour <18) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
 }, []);




  return (
    <div>
        <Navbar/>
        <div className='home-text'>
      <h1>{greeting}<br></br>You're Currently on the Financial Analysis Page..</h1></div>
      <div className='para-text'>
      <p>We are working on building this page for better performance</p>
      <div className="loading-bar"></div>
      </div>
    </div>
  );
}

export default FinanceHome
