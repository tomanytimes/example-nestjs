import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get("db_user")}:${encodeURIComponent(
          configService.get("db_password")
        )}@atlascluster.rmnwsdf.mongodb.net/?retryWrites=true&w=majority`,
      }),
    }),
  ],
})
export class DatabaseModule {}
