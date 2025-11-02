import { MissionUtils } from '@woowacourse/mission-utils';
import Lotto from './Lotto';

class LottoMachine {
  static issueLottoTicket() {
    const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);

    return new Lotto(numbers);
  }
}

export default LottoMachine;
