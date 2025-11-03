export const INPUT_PROMPT = {
  PURCHASE_AMOUNT: '구입금액을 입력해 주세요.\n',
  WINNING_NUMBERS: '당첨 번호를 입력해 주세요.\n',
  BONUS_NUMBER: '보너스 번호를 입력해 주세요.\n',
};

export const OUTPUT_MESSAGE = {
  purchaseCount: (amount) => `${amount}개를 구매했습니다.`,
  rateOfReturn: (rate) => `총 수익률은 ${rate}%입니다.`,
};
