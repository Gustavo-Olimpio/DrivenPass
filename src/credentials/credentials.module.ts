import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { UsersModule } from 'src/users/users.module';
import { credentialsRepository } from './credentials.repositories';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService,credentialsRepository],
  imports:[UsersModule]
})
export class CredentialsModule {}
