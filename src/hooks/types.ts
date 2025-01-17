interface IVirtualScrollItemsStyles {
  height: number;
}

interface IVirtualScrollSettings {
  styles: IVirtualScrollItemsStyles;
  /**
   * 보이는 영역 외에 추가로 렌더링되는 아이템의 수
   */
  bufferSize: number;
  /**
   * 렌더링 될 Element 개수
   */
  renderElementNumber: number;
}

export interface IUseVirtualScrollParams {
  settings: IVirtualScrollSettings;
  data: Array<any>;
}
