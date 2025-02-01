import { WrongLoginException } from "./exceptions/wrong-login.exception";
import { WrongPasswordException } from "./exceptions/wrong-password.exception";

export class UserValidator {
  private static readonly LOGIN_PATTERN = /^[a-zA-Z0-9_]+$/;
  private static readonly MAX_LENGTH = 19;

  public static validateUser(
    login: string,
    password: string,
    confirmPassword: string
  ): boolean {
    try {
      this.validateLogin(login);
      this.validatePassword(password, confirmPassword);

      return true;
    } catch (error) {
      if (
        error instanceof WrongLoginException ||
        error instanceof WrongPasswordException
      ) {
        return false;
      }

      throw error;
    }
  }

  private static validateLogin(login: string): void {
    if (
      !login ||
      login.length > this.MAX_LENGTH ||
      !this.LOGIN_PATTERN.test(login)
    ) {
      throw new WrongLoginException("Invalid login format or length");
    }
  }

  private static validatePassword(
    password: string,
    confirmPassword: string
  ): void {
    if (
      !password ||
      password.length > this.MAX_LENGTH ||
      !this.LOGIN_PATTERN.test(password)
    ) {
      throw new WrongPasswordException("Invalid password format or length");
    }
    if (password !== confirmPassword) {
      throw new WrongPasswordException("Passwords do not match");
    }
  }
}
