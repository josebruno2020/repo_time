import { IsNotEmpty } from 'class-validator';

export class RepositoryDto {
  @IsNotEmpty()
  name: string;

  description: string;
}

export class RepositoryListDto {
  name?: string = '';
}
