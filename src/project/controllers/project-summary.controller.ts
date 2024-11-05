import { Controller, Get, Query } from '@nestjs/common';
import { ProjectSummaryService } from '../services/project-summary.service';
import { ProjectSummaryDto } from '../services/dto/project-summary.dto';

@Controller('projects-summary')
export class ProjectSummaryController {
  constructor(private readonly summaryService: ProjectSummaryService) {}

  @Get()
  async summary(@Query() data: ProjectSummaryDto) {
    return this.summaryService.getProjectsSummary(data);
  }
}
