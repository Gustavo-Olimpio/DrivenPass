import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UsersModule } from 'src/users/users.module';
import { notesRepository } from './notes.repository';

@Module({
  controllers: [NotesController],
  providers: [NotesService,notesRepository],
  imports:[UsersModule]
})
export class NotesModule {}
