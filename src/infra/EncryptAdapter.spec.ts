import * as bcrypt from 'bcrypt';
import EncryptAdapter from './EncryptAdapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },
}));

const salt = 12;

const makeSut = (): EncryptAdapter => {
  return new EncryptAdapter(salt);
};

describe('Encrypter Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const sut = makeSut();
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
  test('should return a hash on sucess', async () => {
    const sut = makeSut();
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});
