import { CreateAccountService } from '../../data/usecases/account/CreateAccountService';
import EncryptAdapter from '../../infra/criptography/EncryptAdapter';
import AccountMongoRepository from '../../infra/database/mongodb/account/AccountMongoRepository';
import { CreateAccountController } from '../../presentation/controllers/CreateAccountController';
import EmailValidatorAdapter from '../../utils/EmailValidatorAdapter';

export const makeCreateAccountController = (): CreateAccountController => {
  const salt = 12;
  const emailValitor = new EmailValidatorAdapter();
  const encryptAdapter = new EncryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();

  const createAccountService = new CreateAccountService(
    encryptAdapter,
    accountMongoRepository,
  );

  return new CreateAccountController(emailValitor, createAccountService);
};
