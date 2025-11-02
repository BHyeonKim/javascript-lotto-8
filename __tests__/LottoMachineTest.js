import { MissionUtils } from '@woowacourse/mission-utils';
import LottoMachine from '../src/models/LottoMachine.js';
import Lotto from '../src/models/Lotto.js';

const generateMockRandomNumbers = (randomNumbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest
    .fn()
    .mockImplementation(() => randomNumbers);
};

describe('Test LottoMachine class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('issueLottoTicket method should return Lotto object', () => {
    const lottoNumber = [1, 2, 3, 4, 5, 6];
    generateMockRandomNumbers(lottoNumber);

    const lotto = LottoMachine.issueLottoTicket();

    expect(lotto).toBeInstanceOf(Lotto);
    expect(lotto.numbers).toEqual(lottoNumber);
  });
});
