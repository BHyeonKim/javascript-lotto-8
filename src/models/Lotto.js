class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateLottoLength(numbers);
    this.#validateLottoNumberDuplication(numbers);

    this.#numbers = numbers;
  }

  #validateLottoLength(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  #validateLottoNumberDuplication(numbers) {
    const set = new Set(numbers);

    if (numbers.length !== set.size) {
      throw new Error('[ERROR] 로또 번호는 중복될 수 없습니다.');
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
}

export default Lotto;
