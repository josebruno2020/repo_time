import { ILike, Repository } from 'typeorm';
import { Project } from '../project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IBaseService } from 'src/shared/services/base.service';
import { ProjectDto, ProjectListDto } from './dto/project.dto';
import { NotFoundException } from '@nestjs/common';
import { RepositoryService } from 'src/repository/services/repository.service';
import { RepositoryEntity } from 'src/repository/repository.entity';

export class ProjectService implements IBaseService<Project, ProjectDto> {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly repositoryService: RepositoryService,
  ) {}

  findAll({ name }: ProjectListDto): Promise<Project[]> {
    return this.projectRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      order: {
        createdAt: 'desc',
      },
      relations: { repositories: true },
    });
  }

  findById(id: string): Promise<Project> {
    return this.projectRepository.findOne({ where: { id } });
  }

  async findByIdOrThrow(id: string): Promise<Project> {
    const project = await this.findById(id);
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return project;
  }

  async create({
    name,
    isTracking,
    repositories,
  }: ProjectDto): Promise<Project> {
    const repositoriesEntities: RepositoryEntity[] = [];
    if (repositories.length) {
      for await (const repositoryId of repositories) {
        const r = await this.repositoryService.findByIdOrThrow(repositoryId);
        repositoriesEntities.push(r);
      }
    }
    return this.projectRepository.save({
      name,
      isTracking,
      repositories: repositoriesEntities,
    });
  }

  async updateById(
    id: string,
    { isTracking, name }: ProjectDto,
  ): Promise<Project> {
    await this.repositoryService.findByIdOrThrow(id);
    await this.projectRepository.update(id, { isTracking, name });
    return this.findById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }

  findAllIsTracking(): Promise<Project[]> {
    return this.projectRepository.find({
      where: { isTracking: true, isActive: true },
    });
  }

  // async addRepository(id: string, repositoryId: string): Promise<void> {
  //   await
  //   const repository = await this.repositoryService.findByIdOrThrow(repositoryId)
  // }
}
