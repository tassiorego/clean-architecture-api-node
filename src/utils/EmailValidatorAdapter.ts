import validator from 'validator';
import { EmailValidator } from '../presentation/protocols';

export default class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}
