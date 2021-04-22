import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskImageModule } from './task-image/task-image.module';
import { TaskSuccessModule } from './task-success/task-success.module';
import { UserModule } from './user/user.module';
import { ImageDataModule } from './image-data/image-data.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://Surachet:0939342490@cluster0.ivm7n.mongodb.net/laberu"),
    TaskImageModule,
    UserModule,
    TaskSuccessModule,
    ImageDataModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
