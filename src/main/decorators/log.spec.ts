import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  httpResponse: HttpResponse;
}

const makeSut = (): SutTypes => {
  const httpResponse = {
    statusCode: 201,
    body: {
      name: 'Tássio',
    },
  };
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      return new Promise(resolve => resolve(httpResponse));
    }
  }
  const controllerStub = new ControllerStub();

  return {
    sut: new LogControllerDecorator(controllerStub),
    controllerStub,
    httpResponse,
  };
};

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub, httpResponse } = makeSut();
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = {
      body: {
        any_value: 'any_value',
        any_key: 'any_key',
      },
    };

    const response = await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
    expect(response).toEqual(httpResponse);
  });
});
