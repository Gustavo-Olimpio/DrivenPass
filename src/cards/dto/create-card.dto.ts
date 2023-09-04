import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "card1",
        description: "title for card"
    })
    Title: string
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: "1234-1234-1234-1234",
        description:"card number"
    })
    Number : number 
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "VISA",
        description: "card name"
    })
    Name : string
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: "123",
        description: "card security number"
    })
    Cvv :  number
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "24/09",
        description:"card validation"
    })
    Date : string
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "SenhaF0rte",
        description: "password card"
    })
    Password : string
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
        example: "true",
        description:"is virtual or not"
    })
    Virtual: boolean
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Credit",
        description: "type of card"
    })
    Type:string
}
