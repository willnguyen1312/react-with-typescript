import React from "react";

export default class Playground extends React.Component {
  renderSomethingOdd = () => {
    debugger;
    return <h1>Fuck Yeah</h1>;
  };
  render() {
    return (
      <>
        <h1>Hello</h1>
        {this.renderSomethingOdd()}
      </>
    );
  }
}
