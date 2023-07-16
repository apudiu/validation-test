import { config } from 'dotenv';
import * as process from 'node:process';
import * as path from 'path';
import { z } from 'zod';

export enum AppEnv {
  Test = 'test',
  Development = 'development',
  Production = 'production',
}

// load env vars
config({
  path: path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const appConfigSchema = z.object({
  app: z.object({
    env: z.nativeEnum(AppEnv),
    key: z.string({ required_error: 'Invalid App key' }),
  }),
  url: z.object({
    api: z.string().url(),
    admin: z.string().url(),
    ui: z.string().url(),
  }),
  auth: z.object({
    // in seconds
    tokenExpiry: z.string({ required_error: 'Invalid token expiry' }).includes('s'),
  }),
  throttle: z.object({
    ttl: z.coerce.number().gt(1),
    limit: z.coerce.number().gt(5).lt(20),
  }),
  db: z.object({
    host: z.string({ required_error: 'Invalid DB host' }),
    port: z.coerce.number({ invalid_type_error: 'Invalid DB port' }),
    name: z.string({ required_error: 'Invalid DB name' }),
    user: z.string({ required_error: 'Invalid DB user' }),
    pass: z.string({ required_error: 'Invalid DB pass' }),
  }),
});

const configFactory = () => {
  return appConfigSchema.parse({
    app: {
      env: process.env.NODE_ENV,
      key: process.env.APP_KEY,
    },
    url: {
      api: process.env.URL_API,
      admin: process.env.URL_ADMIN,
      ui: process.env.URL_UI,
    },
    auth: {
      tokenExpiry: process.env.TOKEN_EXPIRY,
    },
    throttle: {
      ttl: process.env.THROTTLE_TTL,
      limit: process.env.THROTTLE_LIMIT,
    },
    db: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    },
  });
};

export default configFactory;

export type AppConfig = ReturnType<typeof configFactory>;
