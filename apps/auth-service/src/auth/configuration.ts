import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  database: {
    type: process.env.DATABASE_TYPE || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    schema: process.env.DATABASE_SCHEMA,
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    charset: 'utf8mb4',
  },
  app: {
    version: process.env.APP_VERSION || 'v1',
    port: parseInt(process.env.APP_PORT || '3030', 10),
    isProd: process.env.NODE_ENV === 'prod' || false,
    environment: process.env.NODE_ENV || 'dev',
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3: {
      region: process.env.AWS_S3_REGION || '',
    },
    cognito: {
      region: process.env.AWS_COGNITO_REGION,
      clientId: process.env.AWS_COGNITO_CLIENT_ID,
      authority: process.env.AWS_COGNITO_AUTHORITY,
      userPoolId: process.env.AWS_COGNITO_POOL_ID,
      secret: process.env.AWS_COGNITO_SECRET,
    },
  },
});