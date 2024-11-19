import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RepositoryService } from '../services/repository.service';
import {
  RepositoryDto,
  RepositoryListDto,
} from '../services/dto/repository.dto';

@Controller('repositories')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) {}

  @Get()
  getAll(@Query() query: RepositoryListDto) {
    return this.repositoryService.findAll(query);
  }

  @Post()
  create(@Body() data: RepositoryDto) {
    return this.repositoryService.create(data);
  }
}
