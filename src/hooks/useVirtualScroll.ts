import {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useTransition,
} from 'react';

import { debounce } from '@src/utils/native-lodash';
import * as T from './types';

const INDEX_WEAKMAP = new Map<HTMLElement, number>();

export default function useVirtualScroll({
  settings,
  data,
}: T.IUseVirtualScrollParams) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translateYValue, setTranslateYValue] = useState(0);
  const [startNodeIndex, setStartNodeIndex] = useState(0);
  const [isPending, startTransition] = useTransition();

  const dataListAreaRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // INFO: 옵저버가 등록될 아이템
  const frontRef = useRef<
    HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | null
  >(null);
  const backRef = useRef<
    HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | null
  >(null);

  // INFO: IntersectionObserver
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // rFA를 통해 디바운싱을 대체
        requestAnimationFrame(() => {
          entries.forEach((entry) => {
            // const _target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              console.log('>>> entry.isIntersecting');
              // const _index = INDEX_WEAKMAP.get(_target);
              // INFO: 활성화된 타겟은 옵저버 해제
              // if (observerRef.current) observerRef.current.unobserve(_target);
            }
          });
        });
      },
      { root: scrollAreaRef.current, rootMargin: '0px', threshold: 0.1 },
    );

    // INFO: 옵저버 연결 해제
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [scrollAreaRef]);

  // INFO: startNodeIndex가 변경될 때마다 실행
  useEffect(() => {
    const _observer = observerRef.current;
    // INFO: 옵저버가 없으면 조기 반환
    if (!_observer) return;

    console.log('>>> Ref.current', frontRef.current, backRef.current);
    if (frontRef.current) _observer.observe(frontRef.current);
    if (backRef.current) _observer.observe(backRef.current);
  }, []);

  return {
    isLoading: isLoading || isPending,
    observerRef: observerRef,
    translateYValue: translateYValue,
    dataListAreaRef: dataListAreaRef,
    startNodeIndex: startNodeIndex,
    scrollAreaRef: scrollAreaRef,
    bottomPaddingHeight: setTranslateYValue,
    topPaddingHeight: translateYValue,
    itemRefs: {
      frontRef: frontRef,
      backRef: backRef,
    },
  };
}
