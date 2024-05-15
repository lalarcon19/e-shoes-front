export interface Token {
    iss: string,
    sub: string,
    authorities: string,
    iat: string,
    exp: string,
    jti: string,
    nbf: string,
    user_id: string
}