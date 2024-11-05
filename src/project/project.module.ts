import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { RepositoryModule } from 'src/repository/repository.module';
import { ProjectSummaryService } from './services/project-summary.service';
import { ProjectSummaryController } from './controllers/project-summary.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), RepositoryModule],
  providers: [ProjectService, ProjectSummaryService],
  controllers: [ProjectController, ProjectSummaryController],
})
export class ProjectModule {}
