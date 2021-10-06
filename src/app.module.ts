import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ImageDataModule } from './image-data/image-data.module';
import { ProjectModule } from './project/project.module';
import { TaskImageAnnotationModule } from './task-image-annotation/task-image-annotation.module';
import { TaskImageLabellingModule } from './task-image-labelling/task-image-labelling.module';
import { TaskSuccessAnnotationModule } from './task-success-annotation/task-success-annotation.module';
import { TaskSuccessLabellingModule } from './task-success-labelling/task-success-labelling.module';
import { TaskSuccessClassificationModule } from './task-success-classification/task-success-classification.module';
import { TaskImageClassificationModule } from './task-image-classification/task-image-classification.module';
import { TaskImageModule } from './task-image/task-image.module';
import { TaskSuccessModule } from './task-success/task-success.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get(
          'DATABASE_USERNAME',
        )}:${configService.get(
          'DATABASE_PASSWORD',
        )}@cluster0.ivm7n.mongodb.net/${configService.get('DATABASE_NAME')}`,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UserModule,
    ImageDataModule,
    ProjectModule,
    TaskImageAnnotationModule,
    TaskImageLabellingModule,
    TaskSuccessAnnotationModule,
    TaskSuccessLabellingModule,
    TaskSuccessClassificationModule,
    TaskImageClassificationModule,
    TaskImageModule,
    TaskSuccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
