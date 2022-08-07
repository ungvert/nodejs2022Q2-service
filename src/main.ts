import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import { AppModule } from './modules/app.module';
import 'dotenv/config';
import { logLevels } from './common/services/logging.service';
const port = +process.env.BACKEND_PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const rootDirname = dirname(__dirname);
  const DOC_API = await readFile(join(rootDirname, 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);

  console.log(`
🚀  Server is running!
🔉  Listening on port ${port}
📭  Query at http://localhost:${port}
📄  OpenApi docs at http://localhost:${port}/doc
`);
}
bootstrap();
