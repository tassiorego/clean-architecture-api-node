import { AddAccountRepository } from '../../../../data/protocols/AddAccountRepository';
import { AccountModel } from '../../../../domain/models/AccountModel';
import { CreateAccountModel } from '../../../../domain/usecases/CreateAccount';
import MongoHelper from '../helpers/MongoHelper';

export default class AccountMongoRepository implements AddAccountRepository {
  public async create(accountData: CreateAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const { _id, ...accountWithoutId } = result.ops[0];

    return {
      id: _id,
      ...accountWithoutId,
    };
  }
}
