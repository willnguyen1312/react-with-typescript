import React, { useRef } from "react";
import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import styled from "styled-components";

class Wrap extends React.Component {
  ref = React.createRef();

  render() {
    return (this.props.children as any)(this.ref);
  }
}

it("should work", () => {
  const { debug } = render(
    <Wrap>
      {(wrapRef: any) => (
        <div ref={wrapRef}>
          <h1>Hello</h1>
          <h2>Yay</h2>
        </div>
      )}
    </Wrap>
  );
  debug();
  //   console.log(cssValues.width > cssValues.height);
  //   console.log(cssValues.height);
});
