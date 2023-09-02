import { Request ,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto , @Request() req) {
    const userId = req.user.id
    return this.notesService.create(createNoteDto,userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.notesService.findOne(+id, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.notesService.remove(+id,userId);
  }
}
