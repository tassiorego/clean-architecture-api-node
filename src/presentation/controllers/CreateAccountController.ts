import { HttpRequest, HttpResponse } from '../protocols/http';

export default class CreateAccountController {
  public handle(httpRequest: HttpRequest): HttpResponse {
    return {
      statusCode: 400,
      body: new Error('Missing param: name'),
    };
  }
}
