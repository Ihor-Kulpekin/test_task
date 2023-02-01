import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication} from "@nestjs/platform-fastify";
import {ValidationPipe} from "@nestjs/common";
import {useContainer} from "class-validator";
import fastifySecureSession from "@fastify/secure-session";
import fastifyCookie from "@fastify/cookie";
import * as uid from 'uid-safe';
import { fastify } from 'fastify';

import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";

const fastifyInstance = fastify();

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(fastifyInstance)
    );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors();

    await app.register(fastifyCookie);
    await app.register(fastifySecureSession, {
        cookieName: await uid(32),
        cookie: {maxAge: 86400000, secure: true},
        salt: 'mq9hDxBVDbspDR6n',
        secret: configService.get('SECRET'),
    });

    useContainer(app.select(AppModule), {fallbackOnErrors: true})

    await app.listen(3000, '0.0.0.0');
}

bootstrap().then().catch();
