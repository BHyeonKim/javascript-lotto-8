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

  describe('getRank method', () => {
    it.each([[[6, false]], [[6, true]]])(
      'should return rank 1 when 6 numbers match',
      (lottoResult) => {
        const rank = LottoMachine.getRank(lottoResult);

        expect(rank).toBe(1);
      },
    );

    it('should return rank 2 when 5 numbers match with bonus', () => {
      const lottoResult = [5, true];

      const rank = LottoMachine.getRank(lottoResult);

      expect(rank).toBe(2);
    });

    it('should return rank 3 when 5 numbers match without bonus', () => {
      const lottoResult = [5, false];

      const rank = LottoMachine.getRank(lottoResult);

      expect(rank).toBe(3);
    });

    it('should return rank 4 when 4 numbers match', () => {
      const lottoResult = [4, false];

      const rank = LottoMachine.getRank(lottoResult);

      expect(rank).toBe(4);
    });

    it('should return rank 5 when 3 numbers match', () => {
      const lottoResult = [3, false];

      const rank = LottoMachine.getRank(lottoResult);

      expect(rank).toBe(5);
    });

    it('should return 0 when less than 3 numbers match', () => {
      const lottoResult = [2, false];

      const rank = LottoMachine.getRank(lottoResult);

      expect(rank).toBe(0);
    });
  });

  describe('getRanks method', () => {
    it('should count ranks correctly from multiple lotto results', () => {
      const lottoResults = [
        [6, false],
        [5, true],
        [5, false],
        [4, false],
        [3, false],
        [2, false],
      ];

      const ranks = LottoMachine.getRanks(lottoResults);

      expect(ranks).toEqual([0, 1, 1, 1, 1, 1]);
    });

    it('should return all zeros when no winning tickets', () => {
      const lottoResults = [
        [2, false],
        [1, false],
        [0, false],
      ];

      const ranks = LottoMachine.getRanks(lottoResults);

      expect(ranks).toEqual([0, 0, 0, 0, 0, 0]);
    });

    it('should count multiple tickets with same rank', () => {
      const lottoResults = [
        [3, false],
        [3, false],
        [3, false],
      ];

      const ranks = LottoMachine.getRanks(lottoResults);

      expect(ranks).toEqual([0, 0, 0, 0, 0, 3]);
    });
  });
});
