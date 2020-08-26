import React, { useEffect, useState } from "react";
import GeoChart from "./Components/GeoChart";
import axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = useState("");
  const [property, setProperty] = useState("pop_est");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/muratkemaldar/using-react-hooks-with-d3/12-geo/src/GeoChart.world.geo.json"
      )
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <React.Fragment>
      <h2>Map with geo</h2>
      <br></br>
      {data ? <GeoChart data={data} property={property} /> : ""}
      <h2>Select property</h2>
      <select
        value={property}
        onChange={(event) => setProperty(event.target.value)}
      >
        <option value="pop_est">Population</option>
        <option value="name_len">Name length</option>
        <option value="gdp_md_est">GDP</option>
      </select>
    </React.Fragment>
  );
}

export default App;
