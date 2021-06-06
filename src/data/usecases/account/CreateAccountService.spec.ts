import { AccountModel } from '../../../domain/models/AccountModel';
import { CreateAccountModel } from '../../../domain/usecases/CreateAccount';
import { AddAccountRepository } from '../../protocols/AddAccountRepository';
import { Encrypter } from '../../protocols/Encrypter';
import { CreateAccountService } from './CreateAccountService';

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt(): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'));
    }
  }

  return new EncrypterStub();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async create(accountData: CreateAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password',
      };

      return new Promise(resolve => resolve(fakeAccount));
    }
  }

  return new AddAccountRepositoryStub();
};

interface SutType {
  sut: CreateAccountService;
  encryptStub: Encrypter;
  addAccountRepository: AddAccountRepository;
}

const makeSut = (): SutType => {
  const encryptStub = makeEncrypter();
  const addAccountRepository = makeAddAccountRepository();
  const sut = new CreateAccountService(encryptStub, addAccountRepository);

  return {
    sut,
    encryptStub,
    addAccountRepository,
  };
};

describe('CreateAccountService Usecase', () => {
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

  test('should throw Encrypter throws', async () => {
    const { sut, encryptStub } = makeSut();

    jest
      .spyOn(encryptStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };

    const response = sut.execute(accountData);

    await expect(response).rejects.toThrow();
  });

  test('should call AccountRepository with with correct values', async () => {
    const { sut, addAccountRepository } = makeSut();

    const addSpy = jest.spyOn(addAccountRepository, 'create');

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    };

    await sut.execute(accountData);

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });

  test('should throw AddAccountRepository if throws', async () => {
    const { sut, addAccountRepository } = makeSut();

    jest
      .spyOn(addAccountRepository, 'create')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error())),
      );

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };

    const response = sut.execute(accountData);

    await expect(response).rejects.toThrow();
  });

  test('should return an account on success', async () => {
    const { sut } = makeSut();

    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    };

    const account = await sut.execute(accountData);

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });
});
