export interface ILoginRequest {
    password: string;
    email: string;
}

export interface ILoginResponse {
    token: string;
}