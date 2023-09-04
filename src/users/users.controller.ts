import { Request,Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { EraseDto } from './dto/erase.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('users')
  @Post('users/sign-up')
  @ApiOperation({summary:"user registration",description:"here we have the request where the users are sent and stored"})
  @ApiResponse({
    status:HttpStatus.CREATED,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.BAD_REQUEST,
    description:"body contains some wrong information"
  })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('users')
  @ApiOperation({summary:"user login",description:"here is where the user enters his email and password and if they are correct, he receives a validation token"})
  @Post('users/sign-in')
  @ApiResponse({
    status:HttpStatus.CREATED,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.UNAUTHORIZED,
    description:"token is invalid"
  })
  signin(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiTags('erase')
  @ApiOperation({summary:"delete account", description:"Beware, this request has the power to destroy your data."})
  @UseGuards(AuthGuard)
  @Post('erase')
  @ApiResponse({
    status:HttpStatus.CREATED,
    description:"Everything is ok"
  })
  @ApiResponse({
    status:HttpStatus.UNAUTHORIZED,
    description:"token is invalid"
  })
  erase(@Body() eraseDto: EraseDto, @Request() req) {
    const userId = req.user.id
    return this.usersService.erase(userId,eraseDto);
  }

}
