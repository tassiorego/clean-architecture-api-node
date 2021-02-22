import { AccountModel } from '../../domain/models/AccountModel';
import { CreateAccountModel } from '../../domain/usecases/CreateAccount';

export interface AddAccountRepository {
  execute(account: CreateAccountModel): Promise<AccountModel>;
}
