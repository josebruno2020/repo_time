import { IsArray, IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  name: string;

  isTracking: boolean = false;

  @IsArray()
  repositories: string[];
}

export class ProjectListDto {
  name?: string = '';
}
