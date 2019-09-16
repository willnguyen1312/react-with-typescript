import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";

import sample1 from "./pdfs/sample1.pdf";
import sample2 from "./pdfs/sample2.pdf";

export default class Sampe extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <Document file={sample1} onLoadSuccess={this.onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
