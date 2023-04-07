import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { join } from 'path';

@Module({
  imports: [
    // not work, dunno why
    ServeStaticModule.forRoot({
      // rootPath: `${path}/uploads`,
      rootPath: join(path, 'uploads'),
      exclude: ['/api/(.*)'],
      serveRoot: '/static',
    }),
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
