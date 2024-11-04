import axios from 'axios';
import { format, subDays } from 'date-fns';

//TODO colocar em outros arquivos
export interface WakaTimeProject {
  name: string;
  total_seconds: number;
  color: string | null;
  digital: string;
  decimal: string;
  text: string;
  hours: number;
  minutes: number;
  seconds: number;
  percent: number;
}

export interface WakaTimeSummaryData {
  projects: WakaTimeProject[];
}

export interface WakaTimSummaryResponse {
  data: WakaTimeSummaryData[];
}

export class WakaTimeFetchDto {
  repositories: string[];
}

export class WakaTimeFetchResponse {
  date: string;
  repositories: WakaTimeProject[];
}

export class WakaTimeService {
  constructor() {}
  private BASE_URL = 'https://wakatime.com';
  private API_KEY = process.env.WAKA_TIME_API_KEY;

  async fetchSummary({
    repositories,
  }: WakaTimeFetchDto): Promise<WakaTimeFetchResponse> {
    const dateToFetch = this.setFormattedDate();
    const { data } = await axios.get<WakaTimSummaryResponse>(
      `${this.BASE_URL}/api/v1/users/current/summaries`,
      {
        params: {
          start: dateToFetch,
          end: dateToFetch,
        },
        headers: {
          Authorization: `Basic ${this.setBasicAuth()}`,
        },
      },
    );
    console.log(
      `[WAKA_PROJECTS] ${dateToFetch} - ${JSON.stringify(data.data[0].projects) || []}`,
    );
    const wakatimeProjects =
      data.data[0]?.projects?.filter((p) => repositories.includes(p.name)) ||
      [];
    return {
      date: dateToFetch,
      repositories: wakatimeProjects,
    };
  }

  private setFormattedDate(): string {
    const today = new Date();
    const yesterday = subDays(today, 1);
    return format(yesterday, 'yyyy-MM-dd');
  }

  private setBasicAuth(): string {
    return Buffer.from(this.API_KEY).toString('base64');
  }
}
