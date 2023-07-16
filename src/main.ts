import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as process from 'process';
import appConfig from '../configurations/app-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = appConfig();

  app.enableCors({
    origin: [config.url.ui, config.url.admin],
  });

  // removing headers
  (app as any).set('etag', false);
  app.use((_req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });

  // provide app to class validator container
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Serving on: http://localhost:${port}`);
}

bootstrap();
