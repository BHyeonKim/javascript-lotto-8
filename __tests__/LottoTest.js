import Lotto from '../src/models/Lotto.js';
/* eslint-disable no-new */

describe('Lotto class test', () => {
  it('should throw an error when the number of lotto numbers exceeds 6', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 6, 7]);
    }).toThrow('[ERROR]');
  });

  // TODO: Implement production code to pass the test
  it('should throw an error when lotto numbers contain duplicates', () => {
    expect(() => {
      new Lotto([1, 2, 3, 4, 5, 5]);
    }).toThrow('[ERROR]');
  });

  it.each([
    [[1, 2, 3, 4, 5, 6], [1, 2, 10, 11, 12, 13], 2],
    [[1, 2, 3, 4, 5, 6], [1, 2, 6, 11, 12, 13], 3],
    [[1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6], 6],
    [[1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1], 6],
    [[1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12], 0],
  ])(
    'should return num of matched numbers lotto:%s,  win numbers:%s, expected:%s',
    (lottoNumbers, winningNumbers, expected) => {
      const lotto = new Lotto(lottoNumbers);

      expect(lotto.getNumOfMatchedNumbers(winningNumbers)).toBe(expected);
    },
  );

  it.each([
    [[1, 2, 3, 4, 5, 6], 6, true],
    [[1, 2, 3, 4, 5, 6], 7, false],
  ])(
    'checks if lotto numbers:%s have bonus number:%s, then returns %s',
    (lottoNumbers, bonusNumber, expected) => {
      const lotto = new Lotto(lottoNumbers);

      expect(lotto.isWonBonus(bonusNumber)).toBe(expected);
    },
  );
});
