const GAME_CONSTANT = {
  LOTTO_LENGTH: 6,
  BASE_UNIT: 1000,
  NUMBER_START: 1,
  NUMBER_END: 45,
  PRIZE: {
    1: 2_000_000_000,
    2: 30_000_000,
    3: 1_500_000,
    4: 50_000,
    5: 5_000,
  },
  PRIZE_MESSAGE: {
    1: '6개 일치 (2,000,000,000원)',
    2: '5개 일치, 보너스 볼 일치 (30,000,000원)',
    3: '5개 일치 (1,500,000원)',
    4: '4개 일치 (50,000원)',
    5: '3개 일치 (5,000원)',
  },
  NUM_OF_RANKS: 5,
};

export default GAME_CONSTANT;
