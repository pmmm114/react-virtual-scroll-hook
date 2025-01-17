interface IBinarySearchParms {
  /**
   * 최소 인덱스
   */
  low: number;
  /**
   * 최대 인덱스
   */
  high: number;
  /**
   * 현재 요소의 Offset
   */
  targetOffset: number;
  /**
   * 현재 Scroll영역 Top Offset
   */
  currentScrollTopOffset: number;
}

export function BinarySearch({
  low,
  high,
  targetOffset,
  currentScrollTopOffset,
}: IBinarySearchParms) {
  /**
   * INFO: 현재 이분탐색의 middle 값
   *
   * 중간 지점을 계산하고 비트 연산(| 0)으로 소수점 제거
   */
  const mid = ((low + high) / 2) | 0;
  const _targetOffset = targetOffset;

  // INFO: 탐색이 완료될 때 까지 반복
  while (low <= high) {
    // INFO: 비교 조건
    if (currentScrollTopOffset < _targetOffset) {
      low = mid + 1;
    } else if (currentScrollTopOffset > _targetOffset) {
      high = mid - 1;
    } else {
      return mid;
    }
  }

  if (low > 0) {
    return low;
  } else {
    return 0;
  }
}
