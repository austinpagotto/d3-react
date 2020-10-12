import React, { useState } from "react";
import Finale from './Components/Finale'
import "./App.css";

function App() {
  const [data, setData] = useState([10, 25, 50, 30, 120]);
  return (
    <React.Fragment>
      <h2>Using React (Hooks) with D3: Finale </h2>
      <Finale data={data} />
      <button onClick={() => setData(data.map(value => value + 5))}>
        Update data
      </button>
    </React.Fragment>
  );
}

export default App;
