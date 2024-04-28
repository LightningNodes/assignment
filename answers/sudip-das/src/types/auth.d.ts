/**
 * Auth Types to define the types for the auth component
 * @typedef T_Login - to store the login types
 * @typedef T_Register - to store the register types
 */

export type T_Login = {
    email: string
    password: string
}

export type T_Register = {
    name: string,
    email: string,
    password: string
}