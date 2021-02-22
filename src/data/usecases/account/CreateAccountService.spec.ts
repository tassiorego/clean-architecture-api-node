import { Encrypter } from '../../protocols/Encrypter';
import CreateAccountService from './CreateAccountService';

const makeSut = (): any => {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }

  const encryptStub = new EncrypterStub();

  const sut = new CreateAccountService(encryptStub);

  return {
    sut,
    encryptStub,
  };
};

describe('DBCreateAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };

    const { sut, encryptStub } = makeSut();

    const encryptSpy = jest.spyOn(encryptStub, 'encrypt');

    await sut.execute(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
