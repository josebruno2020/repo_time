import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProjectSummaryDto,
  ProjectSummaryResponseDto,
  RepositorySummaryResponseDto,
} from './dto/project-summary.dto';
import { TimeHelper } from 'src/shared/helpers/time.helper';

export class ProjectSummaryService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getProjectsSummary({
    start,
    end,
  }: ProjectSummaryDto): Promise<ProjectSummaryResponseDto[]> {
    const query = this.projectRepository
      .createQueryBuilder('p')
      .innerJoin('p.repositories', 'repository')
      .innerJoin('repository.times', 'time')
      .where('p.isActive = true')
      .andWhere('p.isTracking = true')
      .andWhere('repository.isActive = true')
      .select([
        'p.id as id',
        'p.name as name',
        'SUM(time.totalSeconds) as total',
      ]);

    if (start && end) {
      query.andWhere('time.date between :start and :end', { start, end });
    }

    query.groupBy('p.id').orderBy('total', 'DESC');

    const results = await query.getRawMany();

    return Promise.all(
      results.map(async ({ id, name, total }) => ({
        id,
        name,
        total,
        formatted: TimeHelper.formatTotalSeconds(total),
        repositories: await this.getRepositorySummaryByProjectId(id, {
          start,
          end,
        }),
      })),
    );
  }

  private async getRepositorySummaryByProjectId(
    projectId: string,
    { start, end }: ProjectSummaryDto,
  ): Promise<RepositorySummaryResponseDto[]> {
    const query = this.projectRepository
      .createQueryBuilder('p')
      .leftJoin('p.repositories', 'repository')
      .leftJoin('repository.times', 'time')
      .andWhere('repository.isActive = true')
      .andWhere('p.id = :id', { id: projectId })
      .select([
        'repository.id as id',
        'repository.name as name',
        'SUM(time.totalSeconds) as total',
      ]);

    if (start && end) {
      query.andWhere('time.date between :start and :end', { start, end });
    }

    query.groupBy('repository.id').orderBy('total', 'DESC');

    const results = await query.getRawMany();

    return results.map(({ id, name, total }) => ({
      id,
      name,
      total,
      formatted: TimeHelper.formatTotalSeconds(total),
    }));
  }
}
