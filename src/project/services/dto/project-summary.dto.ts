export class ProjectSummaryDto {
  start?: string;
  end?: string;
}

export class RepositorySummaryResponseDto {
  id: string;
  name: string;
  total: string;
  formatted: string;
}

export class ProjectSummaryResponseDto {
  id: string;
  name: string;
  total: number;
  formatted: string;
  repositories: RepositorySummaryResponseDto[];
}
