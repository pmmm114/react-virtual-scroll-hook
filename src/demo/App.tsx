import { useRef } from 'react';
import VirtualScroll from '@src/components/VirtualScroll';

import { IUseVirtualScrollParams } from '@src/hooks/types';

interface IData {
  key: number;
  value: string;
}

// configuration
const VIRTUAL_SCROLL_SETTINGS = {
  type: 'CURSOR',
  styles: {
    height: 24,
  },
  bufferSize: 5,
  renderElementNumber: 30,
} satisfies IUseVirtualScrollParams['settings'];

export default function App() {
  const data = Array.from({ length: 300 }, (v, i) => ({
    key: i,
    value: `value-${i}`,
  }));

  return (
    <VirtualScroll<'div', IData>
      settings={VIRTUAL_SCROLL_SETTINGS}
      data={data}
      render={({ index, args, ref }) => {
        return (
          <div key={args.key} ref={ref}>
            {args.key}
          </div>
        );
      }}
    />
  );
}
