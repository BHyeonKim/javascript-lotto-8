import ERROR_MESSAGE from '../constants/error.js';
import GAME_CONSTANT from '../constants/gameConstant.js';

class Validator {
  static validateNumber(number) {
    if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    }
  }

  static validatePositiveNumber(number) {
    Validator.validateNumber(number);

    if (number <= 0) {
      throw new Error(ERROR_MESSAGE.NOT_POSITIVE_NUMBER);
    }
  }

  static validateDivideByBaseUnit(number) {
    Validator.validatePositiveNumber(number);

    if (number % GAME_CONSTANT.BASE_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.NOT_DIVIDE_BY_BASE_UNIT);
    }
  }

  static validateLottoNumber(number) {
    Validator.validateNumber(number);
    Validator.validateInteger(number);

    if (
      number < GAME_CONSTANT.NUMBER_START ||
      GAME_CONSTANT.NUMBER_END < number
    ) {
      throw new Error(ERROR_MESSAGE.LOTTO_NUMBER_OUT_OF_BOUND);
    }
  }

  static validateInteger(number) {
    Validator.validateNumber(number);

    if (!Number.isInteger(number)) {
      throw new Error(ERROR_MESSAGE.NOT_INTEGER);
    }
  }

  static validateLottoLength(numbers) {
    if (numbers.length !== GAME_CONSTANT.LOTTO_LENGTH) {
      throw new Error(`[ERROR] ${ERROR_MESSAGE.LOTTO_INVALID_LENGTH}`);
    }
  }
}

export default Validator;
