import { Repository } from 'typeorm';
import { RepoTime } from '../repo-time.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBaseService } from 'src/shared/services/base.service';
import { RepoTimeDto } from './dto/repo-time.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { TimeHelper } from 'src/shared/helpers/time.helper';

export class RepoTimeService implements IBaseService<RepoTime, RepoTimeDto> {
  constructor(
    @InjectRepository(RepoTime)
    private readonly repoTimRepository: Repository<RepoTime>,
    private readonly repositoryService: RepositoryService,
  ) {}

  async findByRepository(repositoryId: string): Promise<RepoTime[]> {
    const repoTimes = await this.repoTimRepository.find({
      where: { repository: { id: repositoryId } },
      order: { createdAt: 'desc' },
    });
    return repoTimes.map((time) => ({
      ...time,
      formatted: TimeHelper.formatTotalSeconds(time.totalSeconds),
    }));
  }

  findById(id: string): Promise<RepoTime> {
    return this.repoTimRepository.findOne({ where: { id } });
  }

  async findByIdOrThrow(id: string): Promise<RepoTime> {
    const r = await this.findById(id);
    if (!r) {
      throw new NotFoundException('Tempo não encontrado');
    }
    return r;
  }

  findByDateAndRepo(
    date: string | Date,
    repositoryId: string,
  ): Promise<RepoTime | null> {
    return this.repoTimRepository.findOne({
      where: { date, repository: { id: repositoryId } },
    });
  }

  async create({
    date,
    hours,
    minutes,
    repositoryName,
    seconds,
    totalSeconds,
  }: RepoTimeDto): Promise<RepoTime> {
    const repository = await this.repositoryService.findByName(repositoryName);
    if (!repository) {
      throw new NotFoundException(
        `Repositório ${repositoryName} não encontrado`,
      );
    }
    const time = await this.findByDateAndRepo(date, repository.id);
    if (time) {
      throw new BadRequestException(
        `Já existe um lançamento de tempo para a data informada: ${date}. Repo: ${repositoryName}`,
      );
    }
    if (!totalSeconds) {
      totalSeconds = TimeHelper.setTotalSeconds(hours, minutes, seconds);
    }

    return this.repoTimRepository.save({
      date,
      hours,
      minutes,
      repository,
      seconds,
      totalSeconds,
    });
  }

  updateById(): Promise<RepoTime> {
    //TODO update time
    throw new Error('Method not implemented.');
  }

  async deleteById(id: string): Promise<void> {
    await this.repoTimRepository.delete(id);
  }
}
