import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCredentialDto } from "./dto/create-credential.dto";

@Injectable()
export class credentialsRepository {
    constructor(private readonly prisma: PrismaService){};
    async create(CreateCredentialDto : CreateCredentialDto,id :number){
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.JWT_SECRET);
        return await this.prisma.credentials.create({
            data:{
                UserId:id,
                Title: CreateCredentialDto.Title,
                Url : CreateCredentialDto.Url,
                Username : CreateCredentialDto.Username,
                Password : cryptr.encrypt(CreateCredentialDto.Password)
            }
        })
    }
    async searchByTitle(Title : string, UserId : number){
        return await this.prisma.credentials.findFirst({
            where : {
                Title,
                UserId
            }
        })
    }
    async getAll(id:number){
        return await this.prisma.credentials.findMany({
            where: {
                UserId:id
            }
        })
    }
    async getById(id:number){
        return await this.prisma.credentials.findFirst({
            where: {
                id
            }
        })
    }
    async deleteById(id:number){
        return await this.prisma.credentials.delete({
            where:{
                id
            }
        })
    }
}