import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ImageDataModule } from './image-data/image-data.module';
import { ProjectModule } from './project/project.module';
import { TaskImageModule } from './task-image/task-image.module';
import { TaskSuccessModule } from './task-success/task-success.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleTaskImageModule } from './schedule/schedule.module';
import { TaskImageRejectModule } from './task-image-reject/task-image-reject.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const username = configService.get('DATABASE_USERNAME');
        const password = configService.get('DATABASE_PASSWORD');
        const name = configService.get('DATABASE_NAME');
        return {
          uri: `mongodb+srv://${username}:${password}@laberu.frmke.mongodb.net/${name}`,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ScheduleModule.forRoot(),
    UserModule,
    ImageDataModule,
    ProjectModule,
    TaskImageModule,
    TaskSuccessModule,
    AuthModule,
    ScheduleTaskImageModule,
    TaskImageRejectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
