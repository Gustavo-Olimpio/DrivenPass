import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    Title: string
    @IsNumber()
    @IsNotEmpty()
    Number : number 
    @IsString()
    @IsNotEmpty()
    Name : string
    @IsNumber()
    @IsNotEmpty()
    Cvv :  number
    @IsString()
    @IsNotEmpty()
    Date : string
    @IsString()
    @IsNotEmpty()
    Password : string
    @IsBoolean()
    @IsNotEmpty()
    Virtual: boolean
    @IsString()
    @IsNotEmpty()
    Type:string
}
