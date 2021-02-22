import * as bcrypt from 'bcrypt';
import EncryptAdapter from './EncryptAdapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },
}));

describe('Encrypter Adapter', () => {
  test('should return a hash on sucess', async () => {
    const salt = 12;
    const sut = new EncryptAdapter(salt);
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
  test('should return a hash on sucess', async () => {
    const salt = 12;
    const sut = new EncryptAdapter(salt);
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});
