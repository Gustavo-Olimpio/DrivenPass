import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCardDto } from "./dto/create-card.dto";

@Injectable()
export class cardsRepository {
    constructor(private readonly prisma: PrismaService){};
    async create(createCardDto : CreateCardDto, userId: number){
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(process.env.JWT_SECRET);
        return await this.prisma.cards.create({
            data:{
                UserId:userId,
                Title:createCardDto.Title,
                Number:createCardDto.Number,
                Name:createCardDto.Name,
                Cvv:cryptr.encrypt(createCardDto.Cvv),
                Date: createCardDto.Date,
                Password:cryptr.encrypt(createCardDto.Password),
                Virtual:createCardDto.Virtual,
                Type :createCardDto.Type
            }
        })
    }
    async getAll(userId : number){
        return await this.prisma.cards.findMany({
            where: {
                UserId:userId
            }
        })
    }
    async getById(id :number){
        return await this.prisma.cards.findFirst({
            where : {
                id
            }
        })

    }
    async getByTitle(title : string, UserId:number){
        return await this.prisma.cards.findFirst({
            where: {
                Title:title,
                UserId
            }
        })
    }
    async deleteById(id:number){
        return await this.prisma.cards.delete({
            where:{
                id
            }
        })
    }
}