import { Controller, Get, Post, Body,Param, Delete, UseGuards,Request } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from 'src/guards/auth.guard';


@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto,@Request() req) {
    const id = req.user.id
    return this.credentialsService.create(createCredentialDto,id);
  }

  @Get()
  findAll(@Request() req) {
    const id = req.user.id
    return this.credentialsService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string , @Request() req) {
    const userId = req.user.id
    return this.credentialsService.findOne(+id,userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id
    return this.credentialsService.remove(+id,userId);
  }
}
