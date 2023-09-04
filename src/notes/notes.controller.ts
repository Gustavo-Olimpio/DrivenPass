import { Request ,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiResponse({
    status:HttpStatus.CREATED,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.CONFLICT,
    description:"Title must be a unique value"
  })
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  @ApiResponse({
    status:HttpStatus.UNAUTHORIZED,
    description:"token is invalid"
  })
  @ApiOperation({summary:"note registration",description:"this request serves to get the note and store it in the database"})
  create(@Body() createNoteDto: CreateNoteDto , @Request() req) {
    const userId = req.user.id
    return this.notesService.create(createNoteDto,userId);
  }

  @Get()
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  @ApiResponse({
    status:HttpStatus.UNAUTHORIZED,
    description:"token is invalid"
  })
  @ApiOperation({summary:"search of all notes",description:"this request fetches all the notes and shows them"})
  findAll(@Request() req) {
    const userId = req.user.id
    return this.notesService.findAll(userId);
  }

  @Get(':id')
  @ApiResponse({
    status:HttpStatus.OK,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  @ApiResponse({
    status:HttpStatus.FORBIDDEN,
    description:"the last ID is not yours"
  })
  @ApiResponse({
    status:HttpStatus.UNAUTHORIZED,
    description:"token is invalid"
  })
  @ApiOperation({summary:"search for a note by ID",description:"this request searches for a specific note by ID"})
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.notesService.findOne(+id, userId);
  }

  @Delete(':id')
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  @ApiResponse({
    status:HttpStatus.FORBIDDEN,
    description:"the last ID is not yours"
  })
  @ApiResponse({
    status:HttpStatus.UNAUTHORIZED,
    description:"token is invalid"
  })
  @ApiOperation({summary:"Delete note by ID",description:"this request deletes a specific note by id"})
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.notesService.remove(+id,userId);
  }
}
