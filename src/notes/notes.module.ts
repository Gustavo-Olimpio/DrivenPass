import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService],
  imports:[UsersModule]
})
export class NotesModule {}
