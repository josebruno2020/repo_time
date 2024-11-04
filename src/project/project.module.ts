import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectService } from './services/project.service';
import { ProjectController } from './project.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), RepositoryModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
