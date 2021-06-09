import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImagedataModule } from './modules/imagedata/imagedata.module';
import { UserModule } from './modules/user/user.module';
import { ProjectmanagementModule } from './modules/projectmanagement/projectmanagement.module';
import { TaskimageModule } from './modules/taskimage/taskimage.module';
import { TasksuccessModule } from './modules/tasksuccess/tasksuccess.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get('DATABASE_USERNAME')}:${configService.get('DATABASE_PASSWORD')}@cluster0.ivm7n.mongodb.net/${configService.get('DATABASE_NAME')}`
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ImagedataModule,
    ProjectmanagementModule,
    UserModule,
    TaskimageModule,
    TasksuccessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
