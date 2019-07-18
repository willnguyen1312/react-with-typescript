import React from "react";
import HOC from "./components/HOC";
import RPS from "./components/RPS";
// import Playground from "./components/Playground";
import Playground from "./components/Sample";

const App = () => {
  return (
    <div className="App">
      <h1>Hi hi</h1>
      {/* <HOC /> */}
      {/* <RPS /> */}
      <Playground />
      <div>
        <img src="https://picsum.photos/id/10/2500/1667" />
      </div>
    </div>
  );
};

export default App;
