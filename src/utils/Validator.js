import ERROR_MESSAGE from '../constants/error.js';

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
}

export default Validator;
