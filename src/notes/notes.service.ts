import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { notesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly repository : notesRepository){}
  async create(createNoteDto: CreateNoteDto, userId: number) {
    const note = await this.repository.getByTitle(createNoteDto.Title)
    if(note) throw new ConflictException()
    return await this.repository.create(createNoteDto,userId);
  }

  async findAll(userId : number) {
    const note = await this.repository.getAll(userId);
    if(!note) new NotFoundException()
    return note
  }

  async findOne(id: number,userId: number) {
    const note = await this.repository.getById(id);
    if(!note) throw new NotFoundException()
    if(note.UserId !== userId) throw new ForbiddenException()
    return note
  }
  
  async remove(id: number,userId :number) {
    const note = await this.repository.getById(id);
    if(!note) throw new NotFoundException()
    if(note.UserId !== userId) throw new ForbiddenException()
    return await this.repository.deleteById(id);
  }
}
