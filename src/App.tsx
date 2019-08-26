import React, { FC } from "react";
// import HOC from "./components/HOC";
// import RPS from "./components/RPS";
// import Playground from "./components/Playground";
import Sample from "./components/Sample";
// import Slider from "./components/Slider";
// import cover from "./axo.jpg";

const Hello = () => <h1>Hello</h1>;

const Hi: FC<{ AAA: any }> = ({ AAA }) => <div>{AAA}</div>;

const App = () => {
  return (
    <div className="App">
      {/* <Hi AAA={<Hello />} /> */}
      {/* <HOC /> */}
      {/* <RPS /> */}
      {/* <Playground /> */}
      <Sample />
      {/* <Slider /> */}
    </div>
  );
};

export default App;
