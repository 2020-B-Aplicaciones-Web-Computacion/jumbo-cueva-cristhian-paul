import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
const helmet = require("helmet")
const session = require('express-session')
const FileStore = require('session-file-store')(session);
var fileStoreOptions ={};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
        store: new FileStore(fileStoreOptions),
        secret: 'SUPER SECRETO'
      })
  );
  await app.listen(3000);
  app.use(cookieParser());

}
bootstrap();
