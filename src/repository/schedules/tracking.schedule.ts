import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WakaTimeService } from '../services/wakatime.service';
import { RepositoryService } from '../services/repository.service';
import { RepoTimeService } from '../services/repo-time.service';

@Injectable()
export class TrackingSchedule {
  constructor(
    private readonly wakaTimeService: WakaTimeService,
    private readonly repositoryService: RepositoryService,
    private readonly repoTimeService: RepoTimeService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handle(): Promise<void> {
    if (process.env.WAKA_CRON_ENABLED != '1') {
      return;
    }
    console.log(`==== [TRACKING_SCHEDULE] ====`);
    console.log(new Date().toString());
    const repos = await this.repositoryService.findAllInProjectTracking();
    const repoNames = repos.map((r) => r.name);
    console.log(repoNames);
    const { date, repositories } = await this.wakaTimeService.fetchSummary({
      repositories: repoNames,
    });
    console.log(date, repositories);
    for await (const {
      hours,
      name,
      minutes,
      seconds,
      total_seconds,
    } of repositories) {
      try {
        await this.repoTimeService.create({
          date,
          hours,
          repositoryName: name,
          minutes,
          seconds,
          totalSeconds: total_seconds,
        });
      } catch (err) {
        console.error(err);
        console.log(`[TRACKING_SCHEDULE_ERROR]: ${err}`);
      }
    }
  }
}
