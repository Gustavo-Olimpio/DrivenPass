import { Request,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EraseDto } from './dto/erase.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @Post('users/sign-up')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('users')
  @Post('users/sign-in')
  signin(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiTags('erase')
  @UseGuards(AuthGuard)
  @Post('erase')
  erase(@Body() eraseDto: EraseDto, @Request() req) {
    const userId = req.user.id
    return this.usersService.erase(userId,eraseDto);
  }

}
