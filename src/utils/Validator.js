import ERROR_MESSAGE from '../constants/error.js';

class Validator {
  static validateNumber(number) {
    if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new Error(ERROR_MESSAGE.NOT_NUMBER);
    }
  }
}

export default Validator;
