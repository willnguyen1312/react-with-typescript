import React, { useState, useEffect } from "react";
import { range } from "lodash";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { PDFDocumentProxy, TextContent } from "pdfjs-dist";

type Match = {
  begin: {
    divIdx: number;
    offset: number;
  };
  end: {
    divIdx: number;
    offset: number;
  };
};

const PDF = () => {
  const wrapperRef = React.createRef<HTMLDivElement>();
  const [textContents, setTextContents] = useState<TextContent[]>([]);
  const [isHightlightAll, setIsHightlightAll] = useState<boolean>(false);
  const [file, setFile] = useState<string>("/sample1.pdf");
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrrentPage] = useState<number>(1);
  const [matches, setMatches] = useState<Match[]>([]);
  const [totalMatch, setTotalMatch] = useState<number>(0);

  useEffect(() => {
    const calculatePhraseMatch = (page: number): number[] => {
      const result: number[] = [];
      if (textContents.length && searchPhrase) {
        const query = searchPhrase.toLowerCase();
        const queryLen = query.length;
        const pageContent = textContents[page - 1].items
          .reduce((acc, cur) => acc + cur.str, "")
          .toLowerCase();

        let matchIdx = -queryLen;
        while (true) {
          matchIdx = pageContent.indexOf(query, matchIdx + queryLen);
          if (matchIdx === -1) {
            break;
          }
          result.push(matchIdx);
        }
      }

      return result;
    };

    const calculateTotalMatch = () => {
      const result: { page: number; indexMatches: number[] }[] = [];
      if (numPages === 0) {
        return result;
      }
      for (let page = 1; page <= numPages; page++) {
        const indexMatches = calculatePhraseMatch(page);
        if (indexMatches.length) {
          result.push({ page, indexMatches });
        }
      }
      return result;
    };

    const converMatches = (indexMatches: number[] = []): Match[] => {
      if (!indexMatches.length) {
        return [];
      }

      const textContentItemsStr = textContents[currentPage - 1].items.map(
        item => item.str
      );

      let i = 0,
        iIndex = 0;
      const end = textContentItemsStr.length - 1;
      const queryLen = searchPhrase.length;
      const result: Match[] = [];

      for (let m = 0, mm = indexMatches.length; m < mm; m++) {
        // Calculate the start position.
        let matchIdx = indexMatches[m];

        // Loop over the divIdxs.
        while (
          i !== end &&
          matchIdx >= iIndex + textContentItemsStr[i].length
        ) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        if (i === textContentItemsStr.length) {
          console.error("Could not find a matching mapping");
        }

        const match: Partial<Match> = {
          begin: {
            divIdx: i,
            offset: matchIdx - iIndex
          }
        };

        matchIdx += queryLen;

        // Somewhat the same array as above, but use > instead of >= to get
        // the end position right.
        while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex
        };
        result.push(match as Match);
      }
      return result as Match[];
    };

    const indexMatchesTotal = calculateTotalMatch();
    const totalMatch = indexMatchesTotal.reduce(
      (acc, cur) => acc + cur.indexMatches.length,
      0
    );

    const indexMatches = indexMatchesTotal.find(
      match => match.page === currentPage
    )?.indexMatches;
    const matches: Match[] = converMatches(indexMatches);
    setMatches(matches);
    setTotalMatch(totalMatch);
  }, [currentPage, numPages, searchPhrase, textContents]);

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
    (window as any).textContents = textContents;
  };

  const goPrevPage = () => setCurrrentPage(Math.max(1, currentPage - 1));

  const goNextPage = () => setCurrrentPage(Math.min(numPages, currentPage + 1));

  const logStuff = () => console.log(numPages);

  const runStuff = () => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      setTimeout(() => {
        const as = wrapper.querySelectorAll("a");
        // const es = wrapper.querySelectorAll("img");
        if (as.length) {
          as[0].addEventListener("click", event => {
            event.preventDefault();
            (window as any).ele = event.target;
            logStuff();
          });
        }
      }, 500);
    }
  };

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
          <label htmlFor="search">
            Search Phrase:
            <input
              value={searchPhrase}
              type="text"
              name="search"
              id="search"
              placeholder="text"
              onChange={({ target }) => setSearchPhrase(target.value)}
            />
          </label>
          <button onClick={goPrevPage}>Previous result</button>
          <button onClick={goNextPage}>Next result</button>
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
        {totalMatch > 0 && <h1>Total Matches: {totalMatch}</h1>}
      </div>
      <div ref={wrapperRef}>
        <Document
          loading={""}
          externalLinkTarget="_blank"
          file={file}
          onItemClick={({ pageNumber }) => {
            setCurrrentPage(Number(pageNumber));
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            loading={""}
            scale={1}
            pageNumber={currentPage}
            onLoadSuccess={runStuff}
            customTextRenderer={({ str, itemIndex }) => {
              let renderStr = str;
              let trackSameIdx = 0;
              for (const { begin, end } of matches) {
                if (begin.divIdx === end.divIdx && begin.divIdx === itemIndex) {
                  renderStr = `${renderStr.slice(
                    0,
                    begin.offset + trackSameIdx
                  )}<mark>${renderStr.slice(
                    begin.offset + trackSameIdx,
                    end.offset + trackSameIdx
                  )}</mark>${renderStr.slice(end.offset + trackSameIdx)}`;
                  trackSameIdx += 13; // <mark></mark> => 13 character length
                } else if (
                  begin.divIdx !== end.divIdx &&
                  begin.divIdx === itemIndex
                ) {
                  renderStr = `${renderStr.slice(
                    0,
                    begin.offset
                  )}<mark>${renderStr.slice(begin.offset)}</mark>`;
                } else if (
                  begin.divIdx !== end.divIdx &&
                  end.divIdx === itemIndex
                ) {
                  renderStr = `<mark>${renderStr.slice(
                    0,
                    end.offset
                  )}</mark>${renderStr.slice(end.offset)}`;
                } else if (
                  end.divIdx - begin.divIdx > 1 &&
                  itemIndex > begin.divIdx &&
                  itemIndex < end.divIdx
                ) {
                  renderStr = `<mark>${str}</mark>`;
                }
              }

              return (
                <span
                  dangerouslySetInnerHTML={{
                    __html: renderStr
                  }}
                ></span>
              );
            }}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDF;
