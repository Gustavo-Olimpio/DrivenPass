import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { usersRepository } from './users.repository';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: usersRepository,
    private readonly jwtService: JwtService
    
    ){};
  async create(createUserDto: CreateUserDto) {
    const userExists = await this.repository.getUserByEmail(createUserDto.email)
    if(userExists) throw new ConflictException()
    return await this.repository.createUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const {email, password} = loginUserDto
    const userExists = await this.repository.getUserByEmail(email)
    if (!userExists) throw new UnauthorizedException()
    const validPassword = await bcrypt.compare(password,userExists.password)
    if (!validPassword) throw new UnauthorizedException()
    return this.createToken(userExists)
  }

  async getUserById(id:number){
    const user = await this.repository.getUserById(id);
    if(!user) throw new NotFoundException()
    return user
  }

  createToken(userExists) {
    const {id , email} = userExists
    const token = this.jwtService.sign({email},
      {
        expiresIn:"7 days",
        subject:String(id),
        issuer:"Driven",
        audience:"User"
      })
    return {token}
  }
  checkToken(token : string){
    const data=this.jwtService.verify(token,{
      audience:"User",
      issuer:"Driven"
    })
    return data
  }
}
