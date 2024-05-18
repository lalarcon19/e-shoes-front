export interface SignupRequest {
    name: String,
    lastname: String,
    email: String,
    documentType: DocumentType,
    document: String,
    address: String,
    username: String,
    password: String,
    rol: Roles
}

export enum DocumentType {
    CC,
    CE
}

export interface Roles {
    roles: String[]
}