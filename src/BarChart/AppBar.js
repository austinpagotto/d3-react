import React, { useState } from "react";
// import Face from './reactFace/Face'
import "../App.css";
import BarChart from "./BarChart";

function AppBar() {
  const [data, setData] = useState([23, 30, 45, 60, 15, 65, 70]);

  
  return (
    <div className="App">
        <BarChart data={data}/>
      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value <= 35))}>
        Filter Data
      </button>
      <button
        onClick={() => setData([...data, Math.round(Math.random() * 100)])}
      >
        Add Data
      </button>
    </div>
  );
}

export default AppBar;
