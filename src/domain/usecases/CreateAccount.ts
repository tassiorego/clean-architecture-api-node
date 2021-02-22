import { AccountModel } from '../models/AccountModel';

export interface CreateAccountModel {
  name: string;
  email: string;
  password: string;
}

export interface CreateAccount {
  execute(account: CreateAccountModel): AccountModel;
}
