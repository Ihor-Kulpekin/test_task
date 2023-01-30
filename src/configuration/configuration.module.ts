import {DynamicModule, Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {ConfigOptions} from "./config.options";
import {CONFIG_OPTIONS} from "./constants/config.constants";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: './development.env'
        })
    ]
})
export class ConfigurationModule {
    static register(options: ConfigOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options
                },
                ConfigService
            ],
            exports: [ConfigService]
        }
    }
}
