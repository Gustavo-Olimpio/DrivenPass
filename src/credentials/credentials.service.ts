import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { credentialsRepository } from './credentials.repositories';
import * as bcrypt from 'bcrypt'

@Injectable()
export class CredentialsService {
  constructor(private readonly repository: credentialsRepository){};
  
  async create(createCredentialDto: CreateCredentialDto,id : number) {
    const cred = await this.repository.searchByTitle(createCredentialDto.Title,id)
    if(cred) throw new ConflictException()
    return await this.repository.create(createCredentialDto,id);
  }

  async findAll(id : number) {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.JWT_SECRET);
    const cred = await this.repository.getAll(id);
    if(!cred) throw new NotFoundException()
    const credAtualizadas = cred.map((e) => ({
      ...e, 
      Password: cryptr.decrypt(e.Password) 
    }));
    return credAtualizadas
  }

  async findOne(id: number , userId : number) {
    const cred = await this.repository.getById(id);
    if(!cred) throw new NotFoundException()
    if(cred.UserId !== userId) throw new ForbiddenException()
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.JWT_SECRET);
    cred.Password = cryptr.decrypt(cred.Password) 
    return cred
  }

  async remove(id: number, userId) {
    const cred = await this.repository.getById(id);
    if(!cred) throw new NotFoundException()
    if(cred.UserId !== userId) throw new ForbiddenException()
    return await this.repository.deleteById(id);
  }
}
