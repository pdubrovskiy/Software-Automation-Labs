import { WrongLoginException } from "./exceptions/wrong-login.exception";
import { WrongPasswordException } from "./exceptions/wrong-password.exception";
import { UserValidator } from "./index";

describe("UserValidator", () => {
  const validLogin = "valid_login";
  const validPassword = "pass123";
  let login: string;
  let password: string;
  let confirmPassword: string;

  beforeEach(() => {
    login = validLogin;
    password = validPassword;
    confirmPassword = validPassword;
  });

  describe("Login validation", () => {
    it("positive: should accept valid login with letters, numbers and underscore", () => {
      login = "john_doe123";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(true);
    });

    it("negative: should reject login with invalid characters", () => {
      login = "john@doe";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(false);
    });

    it("should throw WrongLoginException for invalid login format", () => {
      login = "john@doe";

      expect(() => {
        UserValidator["validateLogin"](login);
      }).toThrow(WrongLoginException);
    });

    it("should include error message in WrongLoginException", () => {
      login = "john@doe";

      expect(() => {
        UserValidator["validateLogin"](login);
      }).toThrow("Invalid login format or length");
    });
  });

  describe("Login length validation", () => {
    it("positive: should accept login with 19 characters", () => {
      login = "1234567890123456789";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(true);
    });

    it("negative: should reject login with 20 characters", () => {
      login = "12345678901234567890";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(false);
    });
  });

  describe("Password validation", () => {
    it("positive: should accept valid password with letters, numbers and underscore", () => {
      password = "pass_123";
      confirmPassword = "pass_123";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(true);
    });

    it("negative: should reject password with invalid characters", () => {
      password = "pass@123";
      confirmPassword = "pass@123";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(false);
    });

    it("should throw WrongPasswordException for invalid password format", () => {
      password = "pass@123";
      confirmPassword = "pass@123";

      expect(() => {
        UserValidator["validatePassword"](password, confirmPassword);
      }).toThrow(WrongPasswordException);
    });

    it("should include format error message in WrongPasswordException", () => {
      password = "pass@123";
      confirmPassword = "pass@123";

      expect(() => {
        UserValidator["validatePassword"](password, confirmPassword);
      }).toThrow("Invalid password format or length");
    });
  });

  describe("Password length validation", () => {
    it("positive: should accept password with 19 characters", () => {
      password = "1234567890123456789";
      confirmPassword = password;

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(true);
    });

    it("negative: should reject password longer than 19 characters", () => {
      password = "12345678901234567890";
      confirmPassword = password;

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(false);
    });
  });

  describe("Password confirmation validation", () => {
    it("positive: should accept matching passwords", () => {
      password = "match123";
      confirmPassword = "match123";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(true);
    });

    it("negative: should reject non-matching passwords", () => {
      password = "pass123";
      confirmPassword = "pass456";

      const result = UserValidator.validateUser(
        login,
        password,
        confirmPassword
      );

      expect(result).toBe(false);
    });

    it("should throw WrongPasswordException when passwords do not match", () => {
      password = "pass123";
      confirmPassword = "pass456";

      expect(() => {
        UserValidator["validatePassword"](password, confirmPassword);
      }).toThrow(WrongPasswordException);
    });

    it("should include mismatch error message in WrongPasswordException", () => {
      password = "pass123";
      confirmPassword = "pass456";

      expect(() => {
        UserValidator["validatePassword"](password, confirmPassword);
      }).toThrow("Passwords do not match");
    });
  });
});
