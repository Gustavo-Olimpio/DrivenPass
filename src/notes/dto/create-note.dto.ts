import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Note1",
        description:"Title by your note"
    })
    Title: string 
    @ApiProperty({
        example: "aidadbna iasnd ainsda iaksndoak",
        description: "your secure text"
    })
    @IsString()
    @IsNotEmpty()
    Text : string
}
