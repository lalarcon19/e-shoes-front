export interface LoginRequest {
    username: String,
    password: String
}

export interface AuthResponse {
    username: String
    message: String,
    jwt: string,
    status: boolean
}