import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryHeaderModule } from './category-header/category-header.module';
import { UsMissionModule } from './us-mission/us-mission.module';
import { CategoryDescriptionModule } from './category-description/category-description.module';
import { JoinModule } from './join/join.module';
import { WhyWeStartedModule } from './why-we-started/why-we-started.module';
import { TestimonialStaticModule } from './testimonial-static/testimonial-static.module';
import { WhyThisBlogModule } from './why-this-blog/why-this-blog.module';
import { KnowMoreModule } from './know-more/know-more.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { FeaturedInModule } from './featured-in/featured-in.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { AboutUsStaticModule } from './about-us-static/about-us-static.module';
import { AboutUsStatisticModule } from './about-us-statistic/about-us-statistic.module';

@Module({
  imports: [
    CategoryHeaderModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      serveRoot: '/api',
      renderPath: 'images',
    }),
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
        subscribers: [__dirname + '/**/*.subscriber{.js, .ts}'],
        synchronize: true, // ИЗМЕНИТЬ
      }),
      inject: [ConfigService],
    }),
    UsMissionModule,
    CategoryDescriptionModule,
    JoinModule,
    WhyWeStartedModule,
    TestimonialStaticModule,
    WhyThisBlogModule,
    KnowMoreModule,
    ContactUsModule,
    AuthModule,
    UsersModule,
    PostsModule,
    FeaturedInModule,
    TestimonialModule,
    AboutUsStaticModule,
    AboutUsStatisticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
