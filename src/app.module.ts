import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryHeaderModule } from './category-header/category-header.module';
import { UsMissionModule } from './us-mission/us-mission.module';
import { CategoryDescriptionModule } from './category-description/category-description.module';

@Module({
  imports: [
    CategoryHeaderModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        synchronize: true, // ИЗМЕНИТЬ
      }),
      inject: [ConfigService],
    }),
    UsMissionModule,
    CategoryDescriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
