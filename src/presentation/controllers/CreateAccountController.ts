import { badRequest } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';
import { MissingParamError } from '../protocols/errors';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class CreateAccountController implements Controller {
  public handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmatiom',
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return {
      statusCode: 200,
      body: '',
    };
  }
}
