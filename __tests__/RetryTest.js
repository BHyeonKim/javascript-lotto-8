import ERROR_MESSAGE from '../src/constants/error';
import Retry from '../src/utils/retry';
import View from '../src/View';

describe('Retry class test', () => {
  it('should retry if callback funcion rejected one time', async () => {
    const callback = jest.fn().mockRejectedValueOnce().mockResolvedValueOnce();

    await Retry.execute(callback);

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should retry if callback funcion rejected multiple times', async () => {
    const callback = jest
      .fn()
      .mockRejectedValueOnce()
      .mockRejectedValueOnce()
      .mockRejectedValueOnce()
      .mockResolvedValueOnce();

    await Retry.execute(callback);

    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('should call callback function once if callback executed successfully', async () => {
    const callback = jest.fn().mockResolvedValueOnce();

    await Retry.execute(callback);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should print error if execption occured', async () => {
    const log = jest.spyOn(View, 'print');

    const callback = jest.fn().mockRejectedValueOnce();

    await Retry.execute(callback);

    expect(log).toHaveBeenCalledWith(
      expect.stringContaining(ERROR_MESSAGE.PREFIX),
    );
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
