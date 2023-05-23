import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { myDocument, myschema } from './app.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb+srv://${process.env.db_user}:${encodeURIComponent(process.env.db_password)}@atlascluster.rmnwsdf.mongodb.net/?retryWrites=true&w=majority`),
    MongooseModule.forFeature([{name : myDocument.name, schema : myschema}])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
