export interface ICreateUser {
  email: string;
  password: string;
  displayName: string;
}

export interface IApiSuccessLogin {
  idToken: string;
  refreshToken: string;
}
