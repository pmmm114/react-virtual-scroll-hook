import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
  useId,
} from 'react';

import { debounce, throttle } from '@src/utils/native-lodash';
import * as T from './types';

interface IUseVirtualScrollProps {
  getScrollElement: () => HTMLDivElement | null;
  indexAttribute: string;
  /**
   * 렌더링 할 DOM 요소 개수
   */
  renderElementNumber: number;
}

export default function useVirtualScroll({
  data,
  getScrollElement,
  renderElementNumber,
  indexAttribute = 'data-index',
}: IUseVirtualScrollProps) {
  const _ID = useId();
  // INFO: 모든 data를 엘리먼트로 rendering하고 Rect데이터 관리
  const INDEX_MAP = useRef<Map<number, DOMRect>>(new Map());
  // INFO: 렌더링 시작 인덱스
  const [renderingStartIndex, setRenderingStartIndex] = useState(0);

  const _filteredList = useMemo(() => {
    return data.slice(
      renderingStartIndex,
      renderingStartIndex + renderElementNumber,
    );
  }, [data, renderElementNumber, renderingStartIndex]);

  /**
   * 요소 측정
   */
  const measureElement = useCallback((element?: Element | null) => {
    if (!element) return;

    // INFO: API를 통한 요소 정보 가져오기
    const _rect = element.getBoundingClientRect();
    const _key = Number(element.getAttribute(indexAttribute));

    // INFO; Map에 Element Rect정보 저장
    INDEX_MAP.current.set(_key, _rect);
    // console.log('>>> measureElement: ', element);
  }, []);

  /**
   * Scroll 이벤트 처리
   */
  const debounceCallback = useCallback(() => {
    console.log('scroll debounced');
  }, []);

  const debouncedScroll = debounce(() => {
    debounceCallback();
  }, 200);

  const throttledScroll = throttle(() => {
    console.log('scroll throttled');
  }, 200);

  const _handleScroll = useCallback(() => {
    debouncedScroll();
    throttledScroll();
  }, [debouncedScroll, throttledScroll]);
  /**
   * ! Scroll 이벤트 처리
   */
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // console.log('>>> entry: ', entry.target);
      }
    });

    console.log('>>> getScrollElement(): ', getScrollElement());
    resizeObserver.observe(getScrollElement());
  }, [data]);

  // setInterval(() => {
  //   console.log(INDEX_MAP);
  // }, 1000);

  return {
    measureElement,
    renderingStartIndex,
    setRenderingStartIndex,
    scrollHandler: _handleScroll,
    filteredList: _filteredList,
  };
}
