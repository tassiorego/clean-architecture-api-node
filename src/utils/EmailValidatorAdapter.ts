import { EmailValidator } from '../presentation/protocols';

export default class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}
