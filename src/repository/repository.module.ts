import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from './repository.entity';
import { RepositoryService } from './services/repository.service';
import { RepositoryController } from './controllers/repository.controller';
import { RepoTime } from './repo-time.entity';
import { TrackingSchedule } from './schedules/tracking.schedule';
import { WakaTimeService } from './services/wakatime.service';
import { RepoTimeService } from './services/repo-time.service';
import { RepoTimeController } from './controllers/repo-time.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryEntity, RepoTime])],
  providers: [
    RepositoryService,
    TrackingSchedule,
    WakaTimeService,
    RepoTimeService,
  ],
  controllers: [RepositoryController, RepoTimeController],
  exports: [RepositoryService],
})
export class RepositoryModule {}
