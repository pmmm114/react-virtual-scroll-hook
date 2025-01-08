import { useCallback, useMemo, useRef } from 'react';

import useVirtualScroll from '@src/hooks/useVirtualScroll';

import { IUseVirtualScrollParams } from '@src/hooks/types';

import * as S from './style.module.scss';
import * as T from './types';

const INDEX_WEAKMAP = new WeakMap<Element, number>();

const VirtualScrollWithItems = ({ items, observe }) => {
  return (
    <div>
      {items.map((item, index) => (
        <Item key={index} item={item} observe={observe} />
      ))}
    </div>
  );
};

const VirtualScroll = <T extends React.ElementType = 'div', D = any>({
  settings,
  data,
  render,
  ...rest
}: T.TVirtualScrollProps<T, D>) => {
  const {
    isLoading,
    observerRef,
    translateYValue,
    startNodeIndex,
    dataListAreaRef,
    scrollAreaRef,
    bottomPaddingHeight,
    topPaddingHeight,
    itemRefs: { frontRef, backRef },
  } = useVirtualScroll({
    settings: settings,
  });
  const _data = useMemo(
    () =>
      data.slice(startNodeIndex, startNodeIndex + settings.renderElementNumber),
    [data, startNodeIndex, settings.renderElementNumber],
  );

  // INFO: 아이템 렌더링 함수
  const renderItem = useCallback(
    ({ startIndex, endIndex, ref, ...rest }: T.IRenderItemParams) => {
      // if (ref?.current) {
      //   INDEX_WEAKMAP.set(ref.current, startIndex);
      // }
      console.log('>>> ref', ref);
      return _data
        .slice(startIndex, endIndex)
        .map((item) => render({ index: item.key, args: item, ref, ...rest }));
    },
    [_data],
  );

  const _bufferSize = useMemo(() => {
    return settings.bufferSize;
  }, [settings.bufferSize]);
  return (
    <div className={S.scrollArea} ref={scrollAreaRef}>
      <div
        className="topPadding"
        style={{
          height: topPaddingHeight,
        }}
      />
      <div ref={dataListAreaRef}>
        {renderItem({ startIndex: 0, endIndex: _bufferSize - 1 })}
        {renderItem({
          startIndex: _bufferSize - 1,
          endIndex: _bufferSize,
          ref: frontRef,
        })}
        {renderItem({
          startIndex: _bufferSize,
          endIndex: -_bufferSize,
        })}
        {renderItem({
          startIndex: -_bufferSize,
          endIndex: -(_bufferSize - 1),
          ref: backRef,
        })}
        {renderItem({
          startIndex: -(_bufferSize - 1),
        })}
      </div>
      <div className="topPadding" />
    </div>
  );
};

export default VirtualScroll;
