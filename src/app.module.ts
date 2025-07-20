import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@src/database/database.module';
import { MyLoggerModule } from '@src/my-logger/my-logger.module';
import { CustomersModule } from '@src/customers/customers.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@src/auth/auth.module';
import { UsersModule } from '@src/users/users.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    DatabaseModule,
    MyLoggerModule,
    CustomersModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 6000,
        limit: 3,
        blockDuration: 1000,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
        blockDuration: 5000,
      },
    ]),
    UsersModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
