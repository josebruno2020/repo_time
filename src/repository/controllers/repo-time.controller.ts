import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RepoTimeService } from '../services/repo-time.service';
import { RepoTimeDto } from '../services/dto/repo-time.dto';

@Controller('repo-times')
export class RepoTimeController {
  constructor(private readonly repoTimeService: RepoTimeService) {}

  @Get('repository/:repoId')
  async getByRepository(@Param('repoId') repositoryId: string) {
    return this.repoTimeService.findByRepository(repositoryId);
  }

  @Post()
  create(@Body() data: RepoTimeDto) {
    return this.repoTimeService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.repoTimeService.deleteById(id);
  }
}
