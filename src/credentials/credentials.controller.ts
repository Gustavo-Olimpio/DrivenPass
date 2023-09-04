import { Controller, Get, Post, Body,Param, Delete, UseGuards,Request, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('credentials')
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

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
  @ApiOperation({summary:"credential registration",description:"this request serves to get the credential and store it in the database"})
  create(@Body() createCredentialDto: CreateCredentialDto,@Request() req) {
    const id = req.user.id
    return this.credentialsService.create(createCredentialDto,id);
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
  @ApiOperation({summary:"search of all credentials",description:"this request fetches all the credentials and shows them"})
  findAll(@Request() req) {
    const id = req.user.id
    return this.credentialsService.findAll(id);
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
  @ApiOperation({summary:"search for a credential by ID",description:"this request searches for a specific credential by ID"})
  findOne(@Param('id') id: string , @Request() req) {
    const userId = req.user.id
    return this.credentialsService.findOne(+id,userId);
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
  @ApiOperation({summary:"Delete credential by ID",description:"this request deletes a specific credential by id"})
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.credentialsService.remove(+id,userId);
  }
}
