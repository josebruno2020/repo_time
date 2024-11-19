import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProjectService } from '../services/project.service';
import { ProjectDto, ProjectListDto } from '../services/dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll(@Query() query: ProjectListDto) {
    return this.projectService.findAll(query);
  }

  @Post()
  create(@Body() data: ProjectDto) {
    return this.projectService.create(data);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.projectService.findByIdOrThrow(id);
  }
}
