import React, { useState } from "react";
import debounce from "lodash.debounce";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { PDFDocumentProxy, TextContent } from "pdfjs-dist";

const PDF = () => {
  const [textContexts, setTextContents] = useState<TextContent[]>([]);
  const [isSearchWholeWord, setIsSearchWholeWord] = useState<boolean>(false);
  const [isHightlightAll, setIsHightlightAll] = useState<boolean>(false);
  const [file, setFile] = useState<string>("/sample.pdf");
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrrentPage] = useState<number>(1);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(
      (event.target.files && ((event.target.files[0] as unknown) as string)) ||
        ""
    );
  };

  const onDocumentLoadSuccess = async (document: PDFDocumentProxy) => {
    setNumPages(document.numPages);

    const textContents: TextContent[] = [];
    for (let index = 1; index <= document.numPages; index++) {
      const page = await document.getPage(index);
      const item = await page.getTextContent();
      textContents.push(item);
    }
    setTextContents(textContents);
  };

  const goPrevPage = () => setCurrrentPage(Math.max(1, currentPage - 1));

  const goNextPage = () => setCurrrentPage(Math.min(numPages, currentPage + 1));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div>
        <div>
          <label htmlFor="file">Load from file:</label>
          <input onChange={onFileChange} type="file" />
        </div>
        <div>
          <span>
            Current Page:{" "}
            <input
              onChange={({ target }) => {
                const newCurrentPage = Number(target.value);
                if (newCurrentPage > 0 && newCurrentPage <= numPages) {
                  setCurrrentPage(newCurrentPage);
                } else {
                  setCurrrentPage(1);
                }
              }}
              value={currentPage}
              type="number"
              min={1}
              max={numPages}
            />
            /{numPages}
          </span>
          <button onClick={goPrevPage}>Previous Page</button>
          <button onClick={goNextPage}>Next Page</button>
          <span>{currentPage === numPages && "Last page"}</span>
        </div>
        <div>
          <span>Search Phrase:</span>
          <input type="text" name="search" id="searrch" placeholder="text" />
          <label htmlFor="wholeword">
            Whole word?
            <input
              type="checkbox"
              name="wholeword"
              id="wholeword"
              checked={isSearchWholeWord}
              onChange={() => setIsSearchWholeWord(!isSearchWholeWord)}
            />
          </label>
          <label htmlFor="hightlightAll">
            Hightlight all?
            <input
              type="checkbox"
              name="hightlightAll"
              id="hightlightAll"
              checked={isHightlightAll}
              onChange={() => setIsHightlightAll(!isHightlightAll)}
            />
          </label>
        </div>
      </div>
      <Document
        loading={""}
        externalLinkTarget="_blank"
        file={file}
        onItemClick={({ pageNumber }) => {
          setCurrrentPage(Number(pageNumber));
        }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page loading={""} scale={1} pageNumber={currentPage} />
      </Document>
    </div>
  );
};

export default PDF;
