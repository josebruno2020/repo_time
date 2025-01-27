import { IsNotEmpty } from 'class-validator';

export class RepoTimeDto {
  @IsNotEmpty()
  date: Date | string;

  @IsNotEmpty()
  repositoryName: string;

  @IsNotEmpty()
  hours: number;

  @IsNotEmpty()
  minutes: number;

  @IsNotEmpty()
  seconds: number;

  totalSeconds: number;
}
