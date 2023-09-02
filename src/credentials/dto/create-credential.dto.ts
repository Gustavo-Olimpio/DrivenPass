import { IsNotEmpty, IsString, IsUrl } from "class-validator"

export class CreateCredentialDto {
    @IsString()
    @IsNotEmpty()
    Title : string
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    Url : string
    @IsString()
    @IsNotEmpty()
    Username : string
    @IsString()
    @IsNotEmpty()
    Password : string
}
