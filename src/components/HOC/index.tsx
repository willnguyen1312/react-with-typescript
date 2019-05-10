import React from "react";
import withMakeCounter, {
  InjectedCounterProps
} from "../../hocs/withMakeCounter";

interface HOCProps extends InjectedCounterProps {
  customValue?: number;
}

const HOC = ({ value, onDecrement, onIncrement, customValue }: HOCProps) => {
  return (
    <div>
      <h1>HOC</h1>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
      <h3>{value}</h3>
      <h4>{customValue}</h4>
    </div>
  );
};

export default withMakeCounter(HOC);
