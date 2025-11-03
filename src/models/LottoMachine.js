import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import GAME_CONSTANT from '../constants/gameConstant.js';

class LottoMachine {
  static issueLottoTicket() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);

    return new Lotto(numbers);
  }

  static checkLottoTicket(lottoTicket, winningNumbers, bonusNumber) {
    const numOfMatchedNumbers =
      lottoTicket.getNumOfMatchedNumbers(winningNumbers);
    const isWonBonus = lottoTicket.isWonBonus(bonusNumber);

    return [numOfMatchedNumbers, isWonBonus];
  }

  static checkLottoTickets(lottoTickets, winningNumbers, bonusNumber) {
    return lottoTickets.map((lottoTicket) =>
      LottoMachine.checkLottoTicket(lottoTicket, winningNumbers, bonusNumber),
    );
  }

  static getRank(lottoResult) {
    const [numOfMatchedNumbers, isWonBonus] = lottoResult;

    switch (numOfMatchedNumbers) {
      case 6:
        return 1;
      case 5:
        if (isWonBonus) {
          return 2;
        }
        return 3;
      case 4:
        return 4;
      case 3:
        return 5;
      default:
        return 0;
    }
  }

  static getRanks(lottoResults) {
    const ranks = Array(GAME_CONSTANT.NUM_OF_RANKS + 1).fill(0);

    lottoResults.forEach((lottoResult) => {
      const rank = LottoMachine.getRank(lottoResult);

      if (rank) {
        ranks[rank] += 1;
      }
    });

    return ranks;
  }
}

export default LottoMachine;
