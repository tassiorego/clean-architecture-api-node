import { Encrypter } from '../../protocols/Encrypter';
import CreateAccountService from './CreateAccountService';

describe('DBCreateAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt(): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'));
      }
    }

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    const encryptStub = new EncrypterStub();

    const encryptSpy = jest.spyOn(encryptStub, 'encrypt');

    const sut = new CreateAccountService(encryptStub);

    await sut.execute(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
