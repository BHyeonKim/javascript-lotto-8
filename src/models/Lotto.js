class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error('[ERROR] 로또 번호는 6개여야 합니다.');
    }
  }

  #checkNumber(number) {
    return this.#numbers.includes(number);
  }

  getNumOfMatchedNumbers(winningNumbers) {
    this.#validate(winningNumbers);

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
