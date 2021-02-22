import { AccountModel } from '../../../domain/models/AccountModel';
import {
  CreateAccount,
  CreateAccountModel,
} from '../../../domain/usecases/CreateAccount';
import { AddAccountRepository } from '../../protocols/AddAccountRepository';
import { Encrypter } from '../../protocols/Encrypter';

export default class CreateAccountService implements CreateAccount {
  private readonly encrypter: Encrypter;

  private readonly addAccountRepository: AddAccountRepository;

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository,
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  public async execute(accountData: CreateAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);

    const account = await this.addAccountRepository.execute({
      ...accountData,
      password: hashedPassword,
    });

    return new Promise(resolve => resolve(account));
  }
}
