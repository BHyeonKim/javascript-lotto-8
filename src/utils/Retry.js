import ERROR_MESSAGE from '../constants/error.js';
import View from '../View.js';

class Retry {
  static async execute(callback) {
    try {
      return await callback();
    } catch (error) {
      if (error instanceof Error) {
        View.print(`${ERROR_MESSAGE.PREFIX} ${error.message}`);
        View.printEmptyLine();

        return Retry.execute(callback);
      }

      View.print(`${ERROR_MESSAGE.PREFIX} ${ERROR_MESSAGE.RUNTIME_ERROR}`);
      View.printEmptyLine();

      return Retry.execute(callback);
    }
  }
}

export default Retry;
