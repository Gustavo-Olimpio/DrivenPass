import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { UsersModule } from 'src/users/users.module';
import { cardsRepository } from './cards.repositories';

@Module({
  controllers: [CardsController],
  providers: [CardsService,cardsRepository],
  imports:[UsersModule]
})
export class CardsModule {}
