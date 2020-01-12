import React, { FC } from "react";
// import HOC from "./components/HOC";
// import RPS from "./components/RPS";
// import Playground from "./components/Playground";
import Sample from "./components/Sample";
import PDF from "./pdf";
import greenlet from "greenlet";
import { calculatePrimes } from "./worker";
// import Slider from "./components/Slider";
// import cover from "./axo.jpg";

const Hello = () => <h1>Hello</h1>;

const Hi: FC<{ AAA: any }> = ({ AAA }) => <div>{AAA}</div>;

// @ts-ignore
const getNum = greenlet(calculatePrimes);

(async () => {
  const result = await getNum(1000, 1000000000);
  // const result = await calculatePrimes(1000, 1000000000);
  console.log(result);
})();

const App = () => {
  return (
    <div className="App">
      {/* <Hi AAA={<Hello />} /> */}
      {/* <HOC /> */}
      {/* <RPS /> */}
      {/* <Playground /> */}
      {/* <Sample /> */}
      <PDF />
      {/* <Slider /> */}
    </div>
  );
};

export default App;
