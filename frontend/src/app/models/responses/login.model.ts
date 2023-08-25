export interface I_LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
  };
  userNotExisting?: boolean;
}
