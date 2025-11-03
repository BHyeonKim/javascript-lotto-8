import GAME_CONSTANT from './constants/gameConstant.js';
import MESSAGE from './constants/message.js';
import LottoMachine from './models/LottoMachine.js';
import Parser from './utils/Parser.js';
import Retry from './utils/retry.js';
import Validator from './utils/Validator.js';
import View from './View.js';

class App {
  async run() {
    const money = await Retry.execute(this.#getMoney);
    View.printEmptyLine();

    const amount = money / GAME_CONSTANT.BASE_UNIT;
    this.#printNumOfAmount(amount);

    const lottoTickets = await Retry.execute(() =>
      this.#getLottoTickets(amount),
    );
    lottoTickets.forEach((ticket) => {
      this.#printLottoTicket(ticket);
    });
    View.printEmptyLine();

    const winningNumbers = await Retry.execute(() => this.#getWinningNumbers());
    View.printEmptyLine();

    const bonusNumber = await Retry.execute(() => this.#getBonusNumber());
    View.printEmptyLine();

    const lottoResults = LottoMachine.checkLottoTickets(
      lottoTickets,
      winningNumbers,
      bonusNumber,
    );
    const ranks = LottoMachine.getRanks(lottoResults);
    this.#printResult(ranks);

    const totalPrize = this.#getTotalPrize(ranks);
    const rateOfReturn = this.#getRateOfReturn(totalPrize, money);
    this.#printRateOfReturn(rateOfReturn);
  }

  async #getMoney() {
    const input = await View.getInput(MESSAGE.ENTER_PURCHASE_AMOUNT);
    const money = Parser.parseMoney(input);

    return money;
  }

  async #getWinningNumbers() {
    const input = await View.getInput(MESSAGE.ENTER_WINNING_NUMBERS);
    const winningNumbers = Parser.parseWinningNumbers(input);

    return winningNumbers;
  }

  async #getBonusNumber() {
    const input = await View.getInput(MESSAGE.ENTER_WINNING_NUMBERS);
    const bonusNumber = Parser.parseNumber(input);

    Validator.validateLottoNumber(bonusNumber);

    return bonusNumber;
  }

  #getLottoTickets(amount) {
    const lottoTickets = [];

    for (let i = 0; i < amount; i += 1) {
      lottoTickets.push(LottoMachine.issueLottoTicket());
    }

    return lottoTickets;
  }

  #getTotalPrize(ranks) {
    let totalPrize = 0;

    for (let rank = ranks.length - 1; rank >= 1; rank -= 1) {
      totalPrize += GAME_CONSTANT.PRIZE[rank] * ranks[rank];
    }

    return totalPrize;
  }

  #getRateOfReturn(totalPrize, money) {
    return Math.round((totalPrize / money) * 10000) / 100;
  }

  #printNumOfAmount(amount) {
    View.print(`${amount}개를 구매했습니다.`);
  }

  #printLottoTicket(lotto) {
    View.print(`[${lotto.numbers.join(', ')}]`);
  }

  #printResult(ranks) {
    for (let rank = ranks.length - 1; rank >= 1; rank -= 1) {
      View.print(`${GAME_CONSTANT.PRIZE_MESSAGE[rank]} - ${ranks[rank]}개`);
    }
  }

  #printRateOfReturn(rateOfReturn) {
    View.print(`총 수익률은 ${rateOfReturn}%입니다.`);
  }
}

export default App;
