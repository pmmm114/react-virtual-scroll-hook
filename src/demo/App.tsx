import { useMemo, useRef } from 'react';

import useVirtualScroll from '@src/hooks/useVirtualScroll';

import { IUseVirtualScrollParams } from '@src/hooks/types';

import * as S from './App.module.scss';
interface IData {
  key: number;
  value: string;
}

/**
 * 설정 값 및 데이터
 */
const data = Array.from({ length: 300 }, (v, i) => ({
  key: i,
  value: `value-${i}`,
}));
// configuration
const VIRTUAL_SCROLL_SETTINGS = {
  itemHeight: 35,
  bufferSize: 5,
  renderElementNumber: 30,
} satisfies IUseVirtualScrollParams['settings'];

export default function App() {
  const _INDEX_ATTRIBUTE = 'data-index';
  const ViratualScrollRoot = useRef<HTMLDivElement>(null);
  const { filteredList, scrollHandler, measureElement } = useVirtualScroll({
    getScrollElement: () => ViratualScrollRoot.current,
    indexAttribute: _INDEX_ATTRIBUTE,
    data: data,
    renderElementNumber: VIRTUAL_SCROLL_SETTINGS.renderElementNumber,
  });

  return (
    <div
      ref={ViratualScrollRoot}
      className={S.virtualScrollLayout}
      onScroll={scrollHandler}
    >
      <div
        className={S.virtualScroll}
        style={{ height: VIRTUAL_SCROLL_SETTINGS.itemHeight * data.length }}
      >
        <div className={S.virtualScroller}>
          {filteredList.map((item, index) => (
            <div
              ref={(ref) => measureElement(ref)}
              key={item.key}
              // INFO: 동적으로 attribute 삽입
              {...{ [_INDEX_ATTRIBUTE]: item.key }}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
