import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";

@Injectable()
export class notesRepository {
    constructor(private readonly prisma: PrismaService){};
    async create(createNoteDto : CreateNoteDto, userId : number){
        return await this.prisma.notes.create({
            data:{
                UserId:userId,
                Title:createNoteDto.Title,
                Text: createNoteDto.Text
            }
        })
    }
    async getAll(userId:number){
        return await this.prisma.notes.findMany({
            where: {
                UserId:userId
            }
        })
    }
    async getById(id : number){
        return await this.prisma.notes.findFirst({
            where : {
                id
            }
        })
    }
    async getByTitle(title : string){
        return await this.prisma.notes.findFirst({
            where :{
                Title: title
            }
        })
    }
    async deleteById(id:number){
        return await this.prisma.notes.delete({
            where : {
                id
            }
        })
    }
}