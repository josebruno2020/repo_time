import { Body, Controller, Get, Post } from '@nestjs/common';
import { RepositoryService } from '../services/repository.service';
import { RepositoryDto } from '../services/dto/repository.dto';

@Controller('repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  getAll() {
    return this.repositoryService.findAll();
  }

  @Post()
  create(@Body() data: RepositoryDto) {
    return this.repositoryService.create(data);
  }
}
