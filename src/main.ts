import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core/nest-factory';
import { IoAdapter } from '@nestjs/platform-socket.io';
import 'reflect-metadata';
import 'source-map-support/register';
import { AppModule } from './app.module';

const logger: Logger = new Logger('EntryPoint');

async function bootstrap(): Promise<void> {
  try {
    const port = 3000;
    const app: INestApplication<any> = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useWebSocketAdapter(new IoAdapter(app));

    await app.listen(port, '0.0.0.0', async (): Promise<void> => {
      const url: string = await app.getUrl();
      logger.debug(`API URL: ${url}`);
    });
  } catch (error) {
    logger.error(error);
  }
}

bootstrap();
