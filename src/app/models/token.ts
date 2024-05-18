export interface Token {
    iss: string,
    sub: string,
    authorities: string,
    iat: number,
    exp: number,
    jti: string,
    nbf: string,
    user_id: number
}