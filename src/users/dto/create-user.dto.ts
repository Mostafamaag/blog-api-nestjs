import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateUserDto {
    

    @IsNotEmpty()
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    @MinLength(3, {message: 'Password is too short'})
    @MaxLength(10, {message: 'Password is too long'})
    password: string
}