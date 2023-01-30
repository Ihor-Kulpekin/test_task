import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigurationModule} from "../configuration/configuration.module";
import {ConfigService} from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigurationModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGODB_URL'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
