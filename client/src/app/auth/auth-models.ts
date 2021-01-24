export interface IUserCredentials {
  email: string;
  password: string;
}
export interface ICreateUser extends IUserCredentials {
  displayName: string;
}

export interface IApiSuccessLogin {
  idToken: string;
  refreshToken: string;
}

export enum USER_LOGIN_ERRORS {
  WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',
  EMAIL_ALREADY_IN_USE = 'EMAIL_ALREADY_IN_USE',
}
