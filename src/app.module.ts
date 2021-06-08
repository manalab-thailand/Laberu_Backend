import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TaskImageObjectModule } from '@laberu/task-image-object';
import { TaskSuccessObjectModule } from '@laberu/task-success-object';
import { ImagedataController } from './modules/imagedata/imagedata.controller';
import { ImagedataModule } from './modules/imagedata/imagedata.module';
import { ProjectmanagementModule } from './modules/projectmanagement/projectmanagement.module';
import { UserModule } from './modules/user/user.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
