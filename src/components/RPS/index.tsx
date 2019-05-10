import React from "react";
import MakeCounter from "../../rps/MakeCounter/";

const RPS = () => {
  return (
    <div>
      <h1>Render Props</h1>
      <MakeCounter>
        {({ value }) => {
          return <h1>{value}</h1>;
        }}
      </MakeCounter>
    </div>
  );
};

export default RPS;
