import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

import * as stories from './VirtualScroll.stories';

const { Default } = composeStories(stories);

describe('DatePickerLabel Component', () => {
  it('Render VirtualScroll', () => {
    const { baseElement } = render(<Default />);

    expect(baseElement).toBeInTheDocument();
  });
});
