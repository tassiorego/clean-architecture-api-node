import { badRequest, internalServerError } from '../helpers/httpHelper';
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

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  public handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return {
        statusCode: 200,
        body: '',
      };
    } catch (error) {
      return internalServerError();
    }
  }
}
