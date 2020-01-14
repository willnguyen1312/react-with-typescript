import React, { useState } from "react";
import { range } from "lodash";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { PDFDocumentProxy, TextContent } from "pdfjs-dist";

type Matches = {
  begin: {
    divIdx: number;
    offset: number;
  };
  end: {
    divIdx: number;
    offset: number;
  };
}[];

const matches: Matches = [
  // {
  //   begin: {
  //     divIdx: 14,
  //     offset: 1
  //   },
  //   end: {
  //     divIdx: 14,
  //     offset: 5
  //   }
  // },
  // {
  //   begin: {
  //     divIdx: 14,
  //     offset: 7
  //   },
  //   end: {
  //     divIdx: 14,
  //     offset: 10
  //   }
  // },
  // {
  //   begin: {
  //     divIdx: 14,
  //     offset: 11
  //   },
  //   end: {
  //     divIdx: 14,
  //     offset: 15
  //   }
  // }
  // {
  //   begin: {
  //     divIdx: 10,
  //     offset: 1
  //   },
  //   end: {
  //     divIdx: 15,
  //     offset: 5
  //   }
  // },
  {
    begin: {
      divIdx: 11,
      offset: 1
    },
    end: {
      divIdx: 11,
      offset: 5
    }
  },
  {
    begin: {
      divIdx: 14,
      offset: 21
    },
    end: {
      divIdx: 15,
      offset: 1
    }
  }
];

const middleIndexes = new Set(
  matches
    .map(match => {
      if (match.end.divIdx - match.begin.divIdx > 1) {
        return range(match.begin.divIdx + 1, match.end.divIdx);
      }
      return [];
    })
    .reduce((acc, cur) => acc.concat(cur), [])
);

const affectedIndexes = matches
  .map(match => {
    return range(match.begin.divIdx, match.end.divIdx + 1);
  })
  .reduce((acc, cur) => acc.concat(cur), []);

const lookupAffectedIndexes = new Set(affectedIndexes);

const PDF = () => {
  const [textContexts, setTextContents] = useState<TextContent[]>([]);
  // const [isSearchWholeWord, setIsSearchWholeWord] = useState<boolean>(false);
  const [isHightlightAll, setIsHightlightAll] = useState<boolean>(false);
  const [file, setFile] = useState<string>("/sample.pdf");
  const [searchPhrase, setSearchPhrase] = useState<string>("");
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
    (window as any).textContents = textContents;
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
          {/* <label htmlFor="wholeword">
            Whole word?
            <input
              type="checkbox"
              name="wholeword"
              id="wholeword"
              checked={isSearchWholeWord}
              onChange={() => setIsSearchWholeWord(!isSearchWholeWord)}
            />
          </label> */}
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
        <Page
          loading={""}
          scale={1}
          pageNumber={currentPage}
          customTextRenderer={({ str, itemIndex }) => {
            if (!lookupAffectedIndexes.has(itemIndex)) {
              return <span>{str}</span>;
            }

            if (middleIndexes.has(itemIndex)) {
              return <mark>{str}</mark>;
            }

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
              }
            }

            return (
              <span
                dangerouslySetInnerHTML={{
                  __html: renderStr
                }}
              ></span>
            );

            // const regex = RegExp(searchPhrase, "gi");
            // return (
            //   <span
            //     dangerouslySetInnerHTML={{
            //       __html: str.replace(regex, match => `<mark>${match}</mark>`)
            //     }}
            //   ></span>
            // );
          }}
        />
      </Document>
    </div>
  );
};

export default PDF;
