import React from "react";

class Text extends React.Component {
  constructor(props: any) {
    super(props);
    debugger;
  }
  render() {
    return <h1>Text</h1>;
  }
}

class Playground extends React.Component {
  state = {
    display: true
  };

  toggle = () => {
    this.setState({
      display: !this.state.display
    });
  };
  render() {
    const { display } = this.state;
    return (
      <div>
        {display ? <Text /> : null}
        <button onClick={this.toggle}>Toggle</button>
      </div>
    );
  }
}

export default Playground;
