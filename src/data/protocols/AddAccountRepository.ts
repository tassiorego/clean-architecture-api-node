import { AccountModel } from '../../domain/models/AccountModel';
import { CreateAccountModel } from '../../domain/usecases/CreateAccount';

export interface AddAccountRepository {
  create(account: CreateAccountModel): Promise<AccountModel>;
}
