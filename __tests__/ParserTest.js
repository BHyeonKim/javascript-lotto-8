import ERROR_MESSAGE from '../src/constants/error.js';
import GAME_CONSTANT from '../src/constants/gameConstant.js';
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

  describe('parseMoney method test', () => {
    it.each([['0'], ['-1000'], ['-2000']])(
      'should throw an error if arg is not a positive number:(%s)',
      (arg) => {
        expect(() => Parser.parseMoney(arg)).toThrow(
          ERROR_MESSAGE.NOT_POSITIVE_NUMBER,
        );
      },
    );

    it.each([['500'], ['1500'], ['2100'], ['999']])(
      `should throw an error if arg is not divisible by base unit (${GAME_CONSTANT.BASE_UNIT}):(%s)`,
      (arg) => {
        expect(() => Parser.parseMoney(arg)).toThrow(
          ERROR_MESSAGE.NOT_DIVIDE_BY_BASE_UNIT,
        );
      },
    );

    it.each([['1000'], ['2000'], ['5000'], ['10000']])(
      'should return a number if arg is valid money amount:(%s)',
      (arg) => {
        expect(() => Parser.parseMoney(arg)).not.toThrow();
        expect(typeof Parser.parseMoney(arg)).toBe('number');
      },
    );
  });

  describe('parseWinningNumbers method test', () => {
    it('should parse comma separated numbers and return an array', () => {
      const input = '1,2,3,4,5,6';

      const result = Parser.parseWinningNumbers(input);

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should throw an error if any number is not valid', () => {
      const input = '1,2,abc,4,5,6';

      expect(() => Parser.parseWinningNumbers(input)).toThrow(
        ERROR_MESSAGE.NOT_NUMBER,
      );
    });

    it.each([['1.5,2,3,4,5,6'], ['1,2,3,4,5,6.7']])(
      'should throw an error if any number is not an integer:(%s)',
      (input) => {
        expect(() => Parser.parseWinningNumbers(input)).toThrow(
          ERROR_MESSAGE.NOT_INTEGER,
        );
      },
    );

    it.each([['0,1,2,3,4,5'], ['1,2,3,4,5,46'], ['-1,1,2,3,4,5']])(
      `should throw an error if any number is out of range (${GAME_CONSTANT.NUMBER_START}-${GAME_CONSTANT.NUMBER_END}):(%s)`,
      (input) => {
        expect(() => Parser.parseWinningNumbers(input)).toThrow(
          ERROR_MESSAGE.LOTTO_NUMBER_OUT_OF_BOUND,
        );
      },
    );

    it('should parse numbers with spaces after commas', () => {
      const input = '1, 2, 3, 4, 5, 6';

      const result = Parser.parseWinningNumbers(input);

      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should handle valid winning numbers at boundary values', () => {
      const input = '1,2,3,43,44,45';

      const result = Parser.parseWinningNumbers(input);

      expect(result).toEqual([1, 2, 3, 43, 44, 45]);
    });
  });
});
