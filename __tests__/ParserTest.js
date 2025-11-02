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
});
