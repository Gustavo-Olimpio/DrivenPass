import { PrismaService } from 'src/prisma/prisma.service';
import { faker } from '@faker-js/faker/locale/en';
import * as bcrypt from "bcrypt";

let prisma: PrismaService;

export function initializeFactoryPrisma(prismaService: PrismaService) {
  prisma = prismaService;
}

export function createUsers() {
    return prisma.users.create({
    data: {
      email: faker.internet.email(),
      password:bcrypt.hashSync('123456789Aa!',10),
    },
  });
}
export function createCredential(userId:number){
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.JWT_SECRET);
    return prisma.credentials.create({
        data:{
            UserId:userId,
            Title: faker.person.jobTitle(),
            Url : faker.internet.url(),
            Username : faker.person.firstName(),
            Password : cryptr.encrypt(faker.animal.bear())
        }
    })
}
export function createNote(userId:number){
    return prisma.notes.create({
        data:{
            UserId:userId,
            Title: faker.person.jobTitle(),
            Text: faker.lorem.paragraph()
        }
    })
}
export function createCards(userId: number){
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.JWT_SECRET);
    return prisma.cards.create({
        data:{
            UserId: userId,
            Title:faker.person.jobTitle(),
            Number:123,
            Name:faker.person.firstName(),
            Cvv:cryptr.encrypt(faker.animal.bird()),
            Date:"22/05",
            Password:cryptr.encrypt(faker.animal.bear()),
            Virtual:true,
            Type :"credito"
        }
    })
}