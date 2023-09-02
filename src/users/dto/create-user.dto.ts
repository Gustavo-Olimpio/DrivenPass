import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email : string 
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password:string
}
