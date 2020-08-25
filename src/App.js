import React, { useEffect, useState } from "react";
import ForceTreeChart from './Components/ForceTreeChart'
import TreeChart from './Components/TreeChart'
import "./App.css";

const initialData = {
  name: "😐",
  children: [
    {
      name: "🙂",
      children: [
        {
          name: "😀",
        },
        {
          name: "😁",
        },
        {
          name: "🤣",
        },
      ],
    },
    {
      name: "😔",
    },
  ],
};

function App() {
  const [data, setData] = useState(initialData);

  return (
    <React.Fragment>
      <h1>Force Layour</h1>
      <ForceTreeChart data={data}/>
      <h1>Animated Tree Chart</h1>
      <TreeChart data={data} />
      <button onClick={() => setData(initialData.children[0])}>
        Update data
      </button>
    </React.Fragment>
  );
}

export default App;
