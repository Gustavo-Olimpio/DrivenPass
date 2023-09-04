import { Request,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  
  @Post()
  create(@Body() createCardDto: CreateCardDto, @Request() req) {
    const userId = req.user.id
    return this.cardsService.create(createCardDto,userId);
  }

  @Get()
  findAll(@Request() req) {
    const userId = req.user.id
    return this.cardsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.cardsService.findOne(+id,userId);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.cardsService.remove(+id,userId);
  }
}
