export interface SignupRequest {
    name: string,
    lastname: string,
    email: string,
    documentType: string,
    document: string,
    address: string,
    password: string,
}

export enum DocumentType {
    CC = "CC",
    CE = "CE"
}