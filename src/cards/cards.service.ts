import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { cardsRepository } from './cards.repositories';

@Injectable()
export class CardsService {
  constructor(private readonly repository : cardsRepository){}
  async create(createCardDto: CreateCardDto, userId:number) {
    const card = await this.repository.getByTitle(createCardDto.Title,userId);
    if(card) throw new ConflictException()
    return await this.repository.create(createCardDto,userId)
  }

  async findAll(userId : number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.JWT_SECRET);
    const cards = this.repository.getAll(userId);
    if(!cards) throw new NotFoundException()

    const cardsAtualizadas = (await cards).map((e) => ({
      ...e, 
      Cvv: cryptr.decrypt(e.Cvv),
      Password: cryptr.decrypt(e.Password) 
    }));
    return cardsAtualizadas
  }

  async findOne(id: number , userId: number) {
    const card = await this.repository.getById(id)
    if(!card) throw new NotFoundException();
    if(card.UserId !== userId) throw new ForbiddenException();
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.JWT_SECRET);
    card.Cvv = cryptr.decrypt(card.Cvv) 
    card.Password = cryptr.decrypt(card.Password) 
    return card
  }

  async remove(id: number, userId: number) {
    const card = await this.repository.getById(id)
    if(!card) throw new NotFoundException();
    if(card.UserId !== userId) throw new ForbiddenException();
    return await this.repository.deleteById(id);
  }
}
