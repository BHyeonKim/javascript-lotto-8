import ERROR_MESSAGE from '../src/constants/error.js';
import Parser from '../src/utils/Parser.js';

describe('Parser class test', () => {
  describe('parseNumber method test', () => {
    it.each([['abc'], ['1a'], ['a1'], ['1.1.1']])(
      'should throw an error if arg cannot be parsed to a valid number:(%s)',
      (arg) => {
        expect(() => Parser.parseNumber(arg)).toThrow(ERROR_MESSAGE.NOT_NUMBER);
      },
    );

    it.each([['1'], ['2'], ['0'], ['-1'], ['1.5']])(
      'should return a number if arg can be parsed to a valid number:(%s)',
      (arg) => {
        expect(() => Parser.parseNumber(arg)).not.toThrow(
          ERROR_MESSAGE.NOT_NUMBER,
        );
        expect(typeof Parser.parseNumber(arg)).toBe('number');
      },
    );
  });
});
