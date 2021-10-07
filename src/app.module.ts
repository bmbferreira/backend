import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BuildsModule } from './builds/builds.module';
import { ProjectsModule } from './projects/projects.module';
import { TestRunsModule } from './test-runs/test-runs.module';
import { TestVariationsModule } from './test-variations/test-variations.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { CompareModule } from './compare/compare.module';
import { ScheduleModule } from '@nestjs/schedule';
import { UserLogsModule } from './shared/user-logs/user-logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    BuildsModule,
    ProjectsModule,
    TestRunsModule,
    TestVariationsModule,
    CompareModule,
    UserLogsModule
  ],
  providers: [
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
