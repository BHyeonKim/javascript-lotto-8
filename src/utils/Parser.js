import Validator from './Validator.js';

class Parser {
  static parseNumber(arg) {
    const number = Number(arg);

    Validator.validateNumber(number);

    return number;
  }

  static parseMoney(arg) {
    const number = Parser.parseNumber(arg);

    Validator.validateDivideByBaseUnit(number);

    return number;
  }
}

export default Parser;
