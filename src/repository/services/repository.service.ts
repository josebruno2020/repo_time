import { IBaseService } from 'src/shared/services/base.service';
import { RepositoryEntity } from '../repository.entity';
import { RepositoryDto } from './dto/repository.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class RepositoryService
  implements IBaseService<RepositoryEntity, RepositoryDto>
{
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repository: Repository<RepositoryEntity>,
  ) {}

  findAll(): Promise<RepositoryEntity[]> {
    return this.repository.find({
      order: {
        createdAt: 'desc',
      },
    });
  }

  findById(id: string): Promise<RepositoryEntity> {
    return this.repository.findOne({ where: { id } });
  }

  findByName(name: string): Promise<RepositoryEntity> {
    return this.repository.findOne({ where: { name } });
  }

  findAllInProjectTracking(): Promise<RepositoryEntity[]> {
    return this.repository.find({
      where: {
        projects: { isTracking: true, isActive: true },
        isActive: true,
      },
    });
  }

  async findByIdOrThrow(id: string): Promise<RepositoryEntity> {
    const r = await this.findById(id);
    if (!r) {
      throw new NotFoundException('Repositorio não encontrado');
    }
    return r;
  }

  async create(data: RepositoryDto): Promise<RepositoryEntity> {
    const repoByName = await this.findByName(data.name);
    if (repoByName) {
      throw new BadRequestException('Repositório com nome já cadastrado');
    }
    return this.repository.save(data);
  }

  async updateById(id: string, data: RepositoryDto): Promise<RepositoryEntity> {
    await this.findByIdOrThrow(id);
    await this.repository.update(id, data);
    return this.findById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
