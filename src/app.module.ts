import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './project/project.module';
import { RepositoryModule } from './repository/repository.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        schema: configService.get('DB_SCHEMA'),
        autoLoadEntities: true,
        logging: configService.get('APP_ENV') === 'local',
        synchronize: false,
      }),
    }),
    ScheduleModule.forRoot(),
    ProjectModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
