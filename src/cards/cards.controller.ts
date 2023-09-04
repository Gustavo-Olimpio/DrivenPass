import { Request,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('cards')
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}
  
 
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
  @ApiOperation({summary:"card registration",description:"this request serves to get the card and store it in the database"})
  create(@Body() createCardDto: CreateCardDto, @Request() req) {
    const userId = req.user.id
    return this.cardsService.create(createCardDto,userId);
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
  @ApiOperation({summary:"search of all cards",description:"this request fetches all the cards and shows them"})
  findAll(@Request() req) {
    const userId = req.user.id
    return this.cardsService.findAll(userId);
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
  @ApiOperation({summary:"search for a card by ID",description:"this request searches for a specific card by ID"})
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.cardsService.findOne(+id,userId);
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
  @ApiOperation({summary:"Delete card by ID",description:"this request deletes a specific card by id"})
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.cardsService.remove(+id,userId);
  }
}
