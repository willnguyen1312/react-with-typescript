import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { PDFDocumentProxy, PDFPageProxy, TextContent } from "pdfjs-dist";
import greenlet from "greenlet";
import { dump } from "../worker";

// const getNum = greenlet(calculatePrimes);
const awesomeDump = greenlet(dump);

export default class PDF extends Component {
  state = {
    file: "/sample.pdf",
    numPages: null
  };

  onFileChange = (event: any) => {
    this.setState({
      file: event.target.files[0]
    });
  };

  onDocumentLoadSuccess = async (arg: PDFDocumentProxy) => {
    this.setState({ numPages: arg.numPages });
    const result: TextContent[] = [];
    for (let index = 1; index <= arg.numPages; index++) {
      const page = await arg.getPage(index);
      const item = await page.getTextContent();
      result.push(item);
    }
    console.log(result);
    awesomeDump(result);
  };

  render() {
    const { file, numPages } = this.state;

    return (
      <div className="Example">
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__load">
            <label htmlFor="file">Load from file:</label>{" "}
            <input onChange={this.onFileChange} type="file" />
          </div>
          <div className="Example__container__document">
            <Document file={file} onLoadSuccess={this.onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>
      </div>
    );
  }
}
