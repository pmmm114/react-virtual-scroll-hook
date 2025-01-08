import type { Meta, StoryObj } from '@storybook/react';

import type { IUseVirtualScrollParams } from '@src/hooks/types';

import VirtualScroll from './VirtualScroll';
import { useRef } from 'react';

const meta: Meta<typeof VirtualScroll> = {
  component: VirtualScroll,
};

export default meta;
type Story = StoryObj<typeof VirtualScroll>;

// configuration
const VIRTUAL_SCROLL_SETTINGS = {
  type: 'CURSOR',
  styles: {
    height: 24,
  },
  virtualStartIndex: 5,
  maxIndex: 300,
  renderElementNumber: 30,
} satisfies IUseVirtualScrollParams['settings'];

export const Default: Story = {
  args: {
    settings: VIRTUAL_SCROLL_SETTINGS,
    render: () => {
      const dataListAreaRef = useRef<HTMLDivElement>(null);

      return (
        <VirtualScroll settings={VIRTUAL_SCROLL_SETTINGS}>
          <div ref={dataListAreaRef}>
            {Array.from({ length: 300 }, (v, i) => i).map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </VirtualScroll>
      );
    },
  },
};
