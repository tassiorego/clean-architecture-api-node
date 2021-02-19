import { badRequest } from '../helpers/httpHelper';
import { MissingParamError } from '../protocols/errors';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class CreateAccountController {
  public handle(httpRequest: HttpRequest): HttpResponse {
    return badRequest(new MissingParamError('name'));
  }
}
