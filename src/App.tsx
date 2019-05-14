import React from "react";
import HOC from "./components/HOC";
import RPS from "./components/RPS";
import Playground from "./components/Playground";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Hi hi</h1>
      {/* <HOC /> */}
      {/* <RPS /> */}
      <Playground />
    </div>
  );
};

export default App;
