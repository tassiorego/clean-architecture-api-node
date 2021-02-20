import { badRequest } from '../helpers/httpHelper';
import { MissingParamError } from '../protocols/errors';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class CreateAccountController {
  public handle(httpRequest: HttpRequest): HttpResponse {
    const { name, email } = httpRequest.body;
    if (!name) {
      return badRequest(new MissingParamError('name'));
    }
    return badRequest(new MissingParamError('email'));
  }
}
