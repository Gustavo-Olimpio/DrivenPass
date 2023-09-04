import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @ApiProperty({
        example: "abcd@gmail.com",
        description: "your email"
    })
    email : string 
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @ApiProperty({
        example: "Str0ngPassw0rd",
        description: "your password"
    })
    password:string
}
