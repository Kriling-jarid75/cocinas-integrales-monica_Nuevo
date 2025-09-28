export interface LoginResponse {
  code: number;
  message: string;
  data: {
    administrador: string;
    token: string;
  };
}
