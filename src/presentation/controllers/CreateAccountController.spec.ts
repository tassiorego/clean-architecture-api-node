import { MissingParamError } from '../protocols/errors';
import CreateAccountController from './CreateAccountController';

describe('CreateAccountController', () => {
  it('should return 400 if no name is provided', () => {
    const sut = new CreateAccountController();

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmatiom: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', () => {
    const sut = new CreateAccountController();

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmatiom: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', () => {
    const sut = new CreateAccountController();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmatiom: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no passwordConfirmation is provided', () => {
    const sut = new CreateAccountController();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmatiom'),
    );
  });
});
