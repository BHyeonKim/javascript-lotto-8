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

  describe('checkLottoTicket method', () => {
    it('should return number of matched numbers and bonus match status', () => {
      const lottoTicket = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 4, 5, 7];
      const bonusNumber = 6;

      const result = LottoMachine.checkLottoTicket(
        lottoTicket,
        winningNumbers,
        bonusNumber,
      );

      expect(result).toEqual([5, true]);
    });

    it('should return correct result when bonus number is not matched', () => {
      const lottoTicket = new Lotto([1, 2, 3, 4, 5, 6]);
      const winningNumbers = [1, 2, 3, 7, 8, 9];
      const bonusNumber = 10;

      const result = LottoMachine.checkLottoTicket(
        lottoTicket,
        winningNumbers,
        bonusNumber,
      );

      expect(result).toEqual([3, false]);
    });
  });

  describe('checkLottoTickets method', () => {
    it('should check multiple lotto tickets', () => {
      const lottoTickets = [
        new Lotto([1, 2, 3, 4, 5, 6]),
        new Lotto([1, 2, 3, 7, 8, 9]),
        new Lotto([10, 11, 12, 13, 14, 15]),
      ];
      const winningNumbers = [1, 2, 3, 4, 5, 7];
      const bonusNumber = 6;

      const results = LottoMachine.checkLottoTickets(
        lottoTickets,
        winningNumbers,
        bonusNumber,
      );

      expect(results).toEqual([
        [5, true],
        [4, false],
        [0, false],
      ]);
    });
  });
});
