export class WrongLoginException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "WrongLoginException";
  }
}
