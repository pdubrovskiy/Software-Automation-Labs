import { ExpectedResult } from "../enums/expected-result.enum";

export interface IRegistrationData {
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  expectedResult: ExpectedResult;
  errorMessage?: string;
}
