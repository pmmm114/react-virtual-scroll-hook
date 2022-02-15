# Welcome to react-virtual-scroll-hook!

Virtual scroller using react onScroll Event
- using react hook
- scroll with data-fetch

Scrolling and dynamically fetching content

## Demo
preparing...

## install
```
npm install --save react-virtual-scroll-hook
```

## Example
```javascript
import React, { useState, useRef, useMemo } from "react";
import {
  FlattenInterpolation,
  ThemedStyledProps,
  css,
} from "styled-components";
import { IGetApiDataReturn } from "@src/hooks/useInfiniteScroll";
import useVirtualScroll, {
  IVirtualScrollSettings,
} from "@src/hooks/useVirtualScroll";

import LoadingCircle from "@src/components/common/LoadingCircle";
import {
  spinAnimation,
  circleWrapAnimation,
} from "@src/components/common/LoadingCircle/styles";

import * as S from "./styles";

export interface VirtualScrollBoxProps {
  settings: IVirtualScrollSettings;
  getter: (startIndex: number) => Array<any>;
  wrapCss?: FlattenInterpolation<ThemedStyledProps<any, any>>;
  // data fetching while scrolling
  dataFetch?: (
    _hasNext: boolean | null,
    _nextCursor: string
  ) => IGetApiDataReturn;
  debouncingDelay?: number;
}

// css 외부로 확장필요
const LoadingCircleWrapStyle = css`
  margin: 7px 0;
  width: 30px;
  height: 30px;
  animation: 1.5s ${circleWrapAnimation()} infinite linear;
`;

const LoadingCircleStyle = css`
  stroke-width: 2px;
  r: calc(30px / 2 - (2px / 2));
  stroke-dasharray: calc(3.14 * (2 * (30px / 2 - (2px / 2))));
  animation: 2s ${spinAnimation(2 * (30 / 2 - 2 / 2))} infinite linear;
`;

export default function VirtualScrollBox({
  settings,
  getter,
  wrapCss,
  dataFetch,
  debouncingDelay = 500,
}: VirtualScrollBoxProps) {
  const itemHeight = settings.styles.height;
  const { isLoading, onScrollHandler, translateYValue, dataList } =
    useVirtualScroll({
      settings: settings,
      itemHeight: itemHeight,
      templateGetter: getter,
      dataFetch: dataFetch,
      debouncingDelay: debouncingDelay,
    });

  return (
    <>
      <S.VirtualScrollBoxWrap
        onScroll={(e) => onScrollHandler(e)}
        wrapCss={wrapCss}
      >
        <div
          className="viewport"
          style={{
            height:
              settings.styles.height * settings.maxIndex +
              (isLoading ? itemHeight : 0),
          }}
        >
          <div
            className="scrollAreat"
            style={{
              willChange: "transform",
              transform: `translateY(${translateYValue}px)`,
            }}
          >
            {dataList}
            <S.VirtualScrollBoxLoadingWrap>
              <LoadingCircle
                wrapCss={LoadingCircleWrapStyle}
                circleCss={LoadingCircleStyle}
                isLoading={isLoading}
              />
            </S.VirtualScrollBoxLoadingWrap>
          </div>
        </div>
      </S.VirtualScrollBoxWrap>
    </>
  );
}
```
