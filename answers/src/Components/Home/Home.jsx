import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';
import styles from "./Home.module.css";
import { CircularProgress } from '@mui/material';

import bg from "./bg.png";
import LoggedInUsers from "../LoggedInUsers/LoggedInUsers"
import { useAuth } from '../Context/AuthContext';

function Home(props) {
  const [series, setSeries] = useState([{
    data: generateInitialData()
  }]);
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  console.log(currentUser,"currr ")
  const options = {
    chart: {
      type: 'candlestick',
      height: 500, // Set chart height
      width: '100%' // Set chart width
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    tooltip: {
      enabled: true,
      theme: 'dark', // You can use 'dark' or 'light' based on your preference or set custom styles
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      x: {
        show: true,
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        }
      },
      // Custom tooltip style
      fillSeriesColor: false,
      marker: {
        show: false,
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = [...series[0].data, ...generateNewData(series[0].data)];
      setSeries([{ data: newData }]);
      setIsLoading(false);
    }, 5000);  
    return () => clearInterval(interval);
  }, [series]);

  return (
    <div className={styles.container}>
      
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={bg} style={{ width: "50px", height: "50px" }} />
        </div>
        <div className={styles.navLinks}>
          {currentUser ? (
            <Link to="/logout" className={`${styles.link} ${styles.neonEffect}`} style={{color:"black"}}>Logout</Link>
          ) : (
            <>
              <Link to="/login" className={`${styles.link} ${styles.neonEffect}`} style={{ marginRight: '20px',color:"black" }}>Login</Link>
              <Link to="/signup" className={`${styles.link} ${styles.neonEffect}`} style={{color:"black"}}>Signup</Link>
            </>
          )}
        </div>
      </div>
     
      <h1 className={`${styles.heading} `} style={{color:"blue"}}>Trade Crypto Perpetual Futures in <span style={{color:"red"}}>INR</span></h1>
      <p className={`${styles.message} ${styles.neonEffect}`}>{currentUser ? `Welcome back, ${currentUser?.displayName}!` : "Please login to view real-time updates."}</p>
      {currentUser ? (
        isLoading?(<div style={{ textAlign: 'center', padding: '20px' }}>
        <CircularProgress />
        <p>Loading data...</p>
      </div>):(<LoggedInUsers/>)

) :(<div>
  <ApexCharts options={options} series={series} type="candlestick" height={410} width={500}/>
</div>)}
    </div>
  );
}

function generateInitialData() {
  const data = [];
  let time = new Date(); // Start from today
  time.setHours(0, 0, 0, 0); // Normalize the time part to start of day

  for (let i = 0; i < 60; i++) { // Change from 10 to 30 for one month data
    data.push({
      x: new Date(time),
      y: [
        Math.floor(Math.random() * 100) + 50, // Open
        Math.floor(Math.random() * 100) + 60, // High
        Math.floor(Math.random() * 100) + 40, // Low
        Math.floor(Math.random() * 100) + 55  // Close
      ]
    });
    time.setDate(time.getDate() - 1); // Move back one day
  }
  return data.reverse(); // Reverse to start the oldest to the newest
}

function generateNewData(data) {
  const lastData = data[data.length - 1];
  const newTime = new Date(lastData.x).getTime() + 86400000; // plus one day
  return [{
    x: new Date(newTime),
    y: [
      Math.floor(Math.random() * 100) + 50, 
      Math.floor(Math.random() * 100) + 60, 
      Math.floor(Math.random() * 100) + 40, 
      Math.floor(Math.random() * 100) + 55
    ]
  }];
}

export default Home;
