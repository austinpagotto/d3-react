import React, { useRef, useEffect, useState } from "react";
import ml5 from "ml5";
import GaugeChart from "./GaugeChart/GaugeChart";
import "./App.css";
import useInterval from "./Interval/useInterval";

let classifier;

function App() {
  const videoRef = useRef();
  const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./my-model/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    });
  }, []);

  useInterval(() => {
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(results[0].label);
        results.sort((a, b) => a.label.localeCompare(b.label));
        setGaugeData(results.map((entry) => entry.confidence));
      });
    }
  }, 500);
  return (
    <React.Fragment>
      <h1>
        {" "}
        are you holding the mug <br />
        <small>
          [{gaugeData[0].toFixed(2)},{gaugeData[1].toFixed(2)}]
        </small>
      </h1>
      <GaugeChart data={gaugeData} />
      <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? "Stop" : "Start"}
      </button>
      <video
        ref={videoRef}
        style={{ transform: "scale(-1,1)" }}
        width="300"
        height="150"
      />
    </React.Fragment>
  );
}

export default App;
