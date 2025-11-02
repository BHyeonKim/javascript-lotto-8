import GAME_CONSTANT from './gameConstant.js';

const ERROR_MESSAGE = {
  LOTTO_INVALID_LENGTH: `로또 번호는 ${GAME_CONSTANT.LOTTO_LENGTH}개여야 합니다`,
  LOTTO_DUPLICATED_NUMBER: '로또 번호는 중복될 수 없습니다.',
  NOT_NUMBER: '숫자가 아닙니다.',
  NOT_POSITIVE_NUMBER: '양수가 아닙니다.',
};

export default ERROR_MESSAGE;
