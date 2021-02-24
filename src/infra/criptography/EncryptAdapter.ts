import * as bcrypt from 'bcrypt';
import { Encrypter } from '../../data/protocols/Encrypter';

export default class EncryptAdapter implements Encrypter {
  private readonly salt: number;

  constructor(salt) {
    this.salt = salt;
  }

  public async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, 12);
  }
}
