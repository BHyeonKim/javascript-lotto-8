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

  // TODO: Write test code according to additional feature implementation
});
