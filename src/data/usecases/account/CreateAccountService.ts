import { AccountModel } from '../../../domain/models/AccountModel';
import {
  CreateAccount,
  CreateAccountModel,
} from '../../../domain/usecases/CreateAccount';
import { Encrypter } from '../../protocols/Encrypter';

export default class CreateAccountService implements CreateAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  public async execute(accountData: CreateAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(accountData.password);
    return new Promise(resolve => resolve(null));
  }
}
