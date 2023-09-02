import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class usersRepository {
    constructor(private readonly prisma: PrismaService){};
    async createUser(body: CreateUserDto) {
        const {email,password} = body
        return await this.prisma.users.create({
            data : {
                email: email,
                password : bcrypt.hashSync(password,10)
            }
        })
    }
    async getUserByEmail(email : string){
        return await this.prisma.users.findFirst({
            where :{
                email
            }
        })
    }
    async getUserById(id : number){
        return await this.prisma.users.findFirst({
            where :{
                id
            }
        })
    }

}