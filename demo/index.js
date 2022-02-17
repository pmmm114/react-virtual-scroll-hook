import { StrictMode } from "react";
import ReactDOM from "react-dom";
import useVirtualScroll from '../src/useVirtualScroll'

const dummyArray = Array.from({length: 600}, (v, i) => i);

// configuration
const VIRTUAL_SCROLL_SETTINGS = {
  styles: {
      height: 50,
  },
  virtualStartIndex: 5,
  sliceAmount: 20,
  maxIndex: 300,
  dataFetchTriggerIndex: 50
};

const template = (startIndex, sliceAmount = VIRTUAL_SCROLL_SETTINGS.sliceAmount) => {
    return dummyArray.slice(startIndex, startIndex + sliceAmount).map(item => {
        return <div>{item}</div>
    })
}

const App = () => {
  const itemHeight = VIRTUAL_SCROLL_SETTINGS.styles.height;
  const { isLoading, onScrollHandler, translateYValue, dataList } =
    useVirtualScroll({
      settings: VIRTUAL_SCROLL_SETTINGS,
      itemHeight: VIRTUAL_SCROLL_SETTINGS.styles.height,
      templateGetter: template,
      dataFetch: null,
    });

  return (
    <>
      <div
        onScroll={(e) => onScrollHandler(e)}
        style={{
            maxHeight: 400,
            overflow: 'scroll',
            backgroundColor: 'green'
        }}
      >
        <div
          className="viewport"
          style={{
            height:
              VIRTUAL_SCROLL_SETTINGS.styles.height * VIRTUAL_SCROLL_SETTINGS.maxIndex +
              (isLoading ? itemHeight : 0),
          }}
        >
          <div
            className="scrollArea"
            style={{
              willChange: "transform",
              transform: `translateY(${translateYValue}px)`,
            }}
          >
            {dataList}
          </div>
        </div>
      </div>
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);