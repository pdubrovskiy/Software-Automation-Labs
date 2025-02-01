export class WrongPasswordException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "WrongPasswordException";
  }
}
