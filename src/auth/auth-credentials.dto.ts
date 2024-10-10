import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthCredentialsDto {

    @IsEmail()
    email: string
    
    @IsNotEmpty()
    password: string
}