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
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });
});
