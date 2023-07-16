import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import appConfig, { AppConfig } from '../configurations/app-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { FeedsModule } from './feeds/feeds.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cs: ConfigService<AppConfig>) => ({
        ttl: cs.get('throttle.ttl', 60, { infer: true }),
        limit: cs.get('throttle.limit', 10, { infer: true }),
      }),
    }),
    FeedsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // register global middleware like this
  //   // consumer
  //   //   .apply(
  //   //     cookieSession({
  //   //       keys: [this.configService.getOrThrow('COOKIE_KEY')],
  //   //     }),
  //   //   )
  //   //   .forRoutes('*');
  // }
}
