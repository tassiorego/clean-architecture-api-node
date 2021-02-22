import { CreateAccount } from '../../domain/usecases/CreateAccount';
import { badRequest, internalServerError, ok } from '../helpers/httpHelper';
import {
  Controller,
  EmailValidator,
  InvalidParamError,
  MissingParamError,
  HttpRequest,
  HttpResponse,
} from '../protocols';

export default class CreateAccountController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly createAccount: CreateAccount;

  constructor(emailValidator: EmailValidator, createAccount: CreateAccount) {
    this.emailValidator = emailValidator;
    this.createAccount = createAccount;
  }

  public handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      const { name, password, passwordConfirmation, email } = httpRequest.body;

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = this.createAccount.execute({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (error) {
      return internalServerError();
    }
  }
}
