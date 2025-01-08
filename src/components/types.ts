import type { ReactElement } from 'react';

import type { IUseVirtualScrollParams } from '@src/hooks/types';

export interface IRenderItemParams {
  startIndex: number;
  endIndex?: number;
  ref?: React.RefObject<HTMLElement | null>;
}

interface IRenderParams<D> {
  ref?: React.RefObject<
    HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | null
  >;
  index: number;
  args: D;
}
export interface IVirtualScrollProps<T, D> {
  /**
   * html tag 종류
   */
  as?: T;
  /**
   * 가상 스크롤 설정
   */
  settings: IUseVirtualScrollParams['settings'];
  /**
   * 렌더링 아이템
   */
  render: ({ ref, index, args }: IRenderParams<D>) => ReactElement;
  /**
   * 데이터
   */
  data: Array<any>;
}

/**
 * VirtualScroll 컴포넌트 Props 인터페이스에서 ComponentPropsWithoutRef를 확장
 *
 * T 제약조건 : React.ElementType
 *
 * type을 사용한 이유
 * - ComponentPropsWithoutRef가 조건부 타입으로 정적인 타입을 필요로 하는 interface에선 사용하기 부적절함
 */
export type TVirtualScrollProps<
  T extends React.ElementType,
  D = any,
> = IVirtualScrollProps<T, D> & React.ComponentPropsWithoutRef<T>;
