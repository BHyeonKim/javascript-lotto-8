import ERROR_MESSAGE from '../src/constants/error.js';
import GAME_CONSTANT from '../src/constants/gameConstant.js';
import Validator from '../src/utils/Validator.js';

describe('Validator class test', () => {
  describe('validateNumber method test', () => {
    it.each([[' '], [true], [{}], [[]], [Symbol], [null], [undefined]])(
      'should throw an error if arg is not a number:(%s)',
      (arg) => {
        expect(() => Validator.validateNumber(arg)).toThrow(
          ERROR_MESSAGE.NOT_NUMBER,
        );
      },
    );

    it.each([[1], [2], [0], [-1]])(
      'should pass test if arg is a number:(%s)',
      (arg) => {
        expect(() => Validator.validateNumber(arg)).not.toThrow(
          ERROR_MESSAGE.NOT_NUMBER,
        );
      },
    );
  });

  describe('validatePositiveNumber method test', () => {
    it.each([[0], [-1]])(
      'should throw an error if arg is not a positive number:(%s)',
      (arg) => {
        expect(() => Validator.validatePositiveNumber(arg)).toThrow(
          ERROR_MESSAGE.NOT_POSITIVE_NUMBER,
        );
      },
    );

    it.each([[1], [2]])(
      'should pass test if arg is a positive number:(%s)',
      (arg) => {
        expect(() => Validator.validatePositiveNumber(arg)).not.toThrow(
          ERROR_MESSAGE.NOT_POSITIVE_NUMBER,
        );
      },
    );
  });

  describe('validateDivideByBaseUnit method test', () => {
    it.each([[900], [1500], [2100]])(
      `should throw an error if arg is not divisible by ${GAME_CONSTANT.BASE_UNIT}`,
      (arg) => {
        expect(() => Validator.validateDivideByBaseUnit(arg)).toThrow(
          ERROR_MESSAGE.NOT_DIVIDE_BY_BASE_UNIT,
        );
      },
    );

    it.each([[1000], [2000], [10000]])(
      `should pass test if arg is not divisible by ${GAME_CONSTANT.BASE_UNIT}`,
      (arg) => {
        expect(() => Validator.validateDivideByBaseUnit(arg)).not.toThrow(
          ERROR_MESSAGE.NOT_POSITIVE_NUMBER,
        );
      },
    );
  });
});
