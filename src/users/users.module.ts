import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersRepository } from './users.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({
    secret: process.env.JWT_SECRET
  })],
  controllers: [UsersController],
  providers: [UsersService,usersRepository],
  exports:[UsersService]
})
export class UsersModule {}
