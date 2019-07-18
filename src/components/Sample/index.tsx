import React from "react";

class Sample extends React.Component {
  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Hello");
  };
  render() {
    return (
      <form
        onFocus={() => console.log("Focus")}
        onBlur={() => console.log("Blur")}
        onSubmit={this.handleSubmit}
      >
        <input type="text" placeholder="name" />
        <input type="number" placeholder="age" />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Sample;
