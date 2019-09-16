import React, { useState } from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";

// this is only here for HMR/codesandbox purposes
// in a real scenario, you'd probably just do the stuff
// that's in the if statement.
let modalRoot = document.getElementById("modal-root") as HTMLDivElement;
if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
}

interface ModalProps {
  onClose: () => void;
}

class Modal extends React.Component<ModalProps> {
  el = document.createElement("div");
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      <div
        style={{
          position: "absolute",
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.3)"
        }}
        onClick={this.props.onClose}
      >
        <div
          style={{
            padding: 20,
            background: "#fff",
            borderRadius: "2px",
            display: "inline-block",
            minHeight: "300px",
            margin: "1rem",
            position: "relative",
            minWidth: "300px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
            justifySelf: "center"
          }}
          onClick={e => e.stopPropagation()}
        >
          {this.props.children}
          <hr />
          <button onClick={this.props.onClose}>Close</button>
        </div>
      </div>,
      this.el
    );
  }
}

const App = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleShowModal = () => setIsShowModal(!isShowModal);

  return (
    <>
      {isShowModal && (
        <Modal onClose={toggleShowModal}>
          <div>Hello! I'm a modal</div>
        </Modal>
      )}
      <button onClick={toggleShowModal}>Toggle Modal</button>
    </>
  );
};

test("modal shows the children and a close button", () => {
  // Act
  const { debug, queryByText } = render(<App />);

  const button = queryByText("Toggle Modal") as HTMLButtonElement;

  expect(button).toBeTruthy();

  fireEvent.click(button);

  expect(queryByText("Hello! I'm a modal")).toBeTruthy();

  fireEvent.click(queryByText(/close/i) as HTMLButtonElement);
  expect(queryByText("Hello! I'm a modal")).toBeFalsy();
});
