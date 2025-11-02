import Validator from './Validator.js';

class Parser {
  static parseNumber(arg) {
    const number = Number(arg);

    Validator.validateNumber(number);

    return number;
  }
}

export default Parser;
