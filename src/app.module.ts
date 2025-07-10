import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [DatabaseModule, MyLoggerModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
