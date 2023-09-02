import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    Title: string 
    @IsString()
    @IsNotEmpty()
    Text : string
}
