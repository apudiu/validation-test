import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from './feed.entity';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Feed])
  ],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule {}
