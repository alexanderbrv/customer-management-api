import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@src/database/database.module';
import { MyLoggerModule } from '@src/my-logger/my-logger.module';
import { CustomersModule } from '@src/customers/customers.module';

@Module({
  imports: [DatabaseModule, MyLoggerModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
