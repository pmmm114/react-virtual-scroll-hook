import { BinarySearch } from './core';

import * as TC from './testCase';

describe('Utils/Core', () => {
  // INFO: BinarySearch 테스트
  describe('BinarySearch', () => {
    it('should return the target index', () => {
      const _result = BinarySearch(TC.FIRST_CASE);

      console.log(_result);

      expect(_result).toBe(5);
    });
  });
});
