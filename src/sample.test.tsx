import React, { useState } from "react";
import ReactModal from "react-modal";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const App = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleShowModal = () => setIsShowModal(!isShowModal);

  return (
    <>
      {isShowModal && <ExampleApp />}

      <button onClick={toggleShowModal}>Toggle Modal</button>
    </>
  );
};

class ExampleApp extends React.Component {
  state = {
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <>
        <button id="button" onClick={this.handleOpenModal}>
          Trigger Modal
        </button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
        >
          <div>
            <button onClick={this.handleCloseModal}>Close Modal</button>
            <h1>Hello! I'm Modal</h1>
          </div>
        </ReactModal>
      </>
    );
  }
}

test("modal shows the children and a close button", () => {
  const { getByText } = render(<App />);
  fireEvent.click(getByText(/Toggle Modal/i));
  fireEvent.click(getByText(/Trigger Modal/i));
  expect(getByText("Hello! I'm Modal")).toBeTruthy();
});
