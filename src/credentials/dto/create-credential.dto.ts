import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreateCredentialDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "credential1",
        description:"credential name title"
    })
    Title : string
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @ApiProperty({
        example: "www.google.com",
        description: "url site"
    })
    Url : string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "GreenMonster",
        description: "user name for site"
    })
    Username : string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Passw0rd",
        description: "password for the site"
    })
    Password : string
}
