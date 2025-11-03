import ERROR_MESSAGE from '../constants/error.js';
import Validator from '../utils/Validator.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateLottoLength(numbers);
    this.#validateLottoNumberDuplication(numbers);

    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validateLottoLength(numbers) {
    Validator.validateLottoLength(numbers);
  }

  #validateLottoNumberDuplication(numbers) {
    const set = new Set(numbers);

    if (numbers.length !== set.size) {
      throw new Error(`[ERROR] ${ERROR_MESSAGE.LOTTO_DUPLICATED_NUMBER}`);
    }
  }

  #checkNumber(number) {
    return this.#numbers.includes(number);
  }

  getNumOfMatchedNumbers(winningNumbers) {
    this.#validateLottoLength(winningNumbers);
    this.#validateLottoNumberDuplication(winningNumbers);

    let count = 0;

    winningNumbers.forEach((winningNumber) => {
      if (this.#checkNumber(winningNumber)) {
        count += 1;
      }
    });

    return count;
  }

  isWonBonus(bonusNumber) {
    return this.#checkNumber(bonusNumber);
  }

  get numbers() {
    return [...this.#numbers];
  }
}

export default Lotto;
