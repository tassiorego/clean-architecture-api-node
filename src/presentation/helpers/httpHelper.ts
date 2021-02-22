import { InternalError } from '../protocols/errors';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const internalServerError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new InternalError(),
  };
};

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});
