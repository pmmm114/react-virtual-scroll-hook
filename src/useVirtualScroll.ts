import { useRef, useState, useMemo, useEffect, useCallback, useTransition } from 'react';
import { debounce } from './utils';

export interface IVirtualScrollItemsStyles {
  height: number;
}

export interface IVirtualScrollSettings {
  styles: IVirtualScrollItemsStyles;
  virtualStartIndex: number;
  maxIndex: number;
  dataFetchTriggerIndex: number;
}

interface IUseVirtualScrollParams {
  settings: IVirtualScrollSettings;
  templateGetter: (startIndex: number) => Array<any>;
  dataFetch?: (
    _hasNext: boolean | null,
    _nextCursor: string,
  ) => IGetApiDataReturn;
  debouncingDelay: number;
}

export interface IGetApiDataReturn {
  hasNext: boolean;
  nextCursor: string;
}

export default function useVirtualScroll({
  settings,
  templateGetter,
  dataFetch,
  debouncingDelay,
}: IUseVirtualScrollParams) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [translateYValue, setTranslateYValue] = useState(0);
  const [startNode, setStartNode] = useState(0);
  const [isPending, startTransition] = useTransition();

  const isRunningFetch = useRef<boolean>(false);
  const hasNextRef = useRef<boolean | null>(null);
  const nextCursorQueryStringRef = useRef<string>('');
  const debouncerRef = useRef<null | ReturnType<typeof debounce>>(null);

  const dataList = useMemo(
    () => templateGetter(startNode),
    [templateGetter, startNode],
  );

  const requestAnimationFramer = useCallback((scrollTop: number) => {
    requestAnimationFrame(() => {
      setScrollTop(scrollTop);
    });
  }, []);

  const onScrollHandler = useCallback((e: any) => {
    const {
      target: { scrollTop },
    } = e;
    if (debouncerRef.current) {
      debouncerRef.current(scrollTop);
    }
    setScrollTop(scrollTop);
  }, []);

  const getDataList = useCallback(async (_currentIndex: number) => {
    if (_currentIndex >= settings.maxIndex - settings.dataFetchTriggerIndex) {
      if (!isRunningFetch.current) {
        let _hasNext = null;
        let _nextCursor = '';

        if (dataFetch) {
          isRunningFetch.current = true;
          setIsLoading(true);
          const { hasNext, nextCursor } = await dataFetch(
            hasNextRef.current,
            nextCursorQueryStringRef.current,
          );
          _hasNext = hasNext;
          _nextCursor = nextCursor;
        }
        hasNextRef.current = _hasNext;
        nextCursorQueryStringRef.current = _nextCursor;
        isRunningFetch.current = false;
        setIsLoading(false);
      }
    }
  }, [dataFetch, settings.maxIndex, settings.dataFetchTriggerIndex]);

  useEffect(() => {
    const currentIndex = Math.floor(scrollTop / settings.styles.height);
    const startNode = Math.max(
      Math.floor(currentIndex - (settings.virtualStartIndex - 1)),
      0,
    );

    startTransition(() => {
      setTranslateYValue(startNode * settings.styles.height);
      setStartNode(startNode);
    });

    if (settings.maxIndex > 0) {
      getDataList(currentIndex);
    }
  }, [scrollTop]);

  useEffect(() => {
    debouncerRef.current = debounce((_scrollTop: number) => {
      requestAnimationFramer(_scrollTop);
    }, debouncingDelay);
  }, [debouncingDelay, requestAnimationFramer]);

  return {
    isLoading: isLoading || isPending,
    onScrollHandler: onScrollHandler,
    translateYValue: translateYValue,
    dataList: dataList,
  };
}
