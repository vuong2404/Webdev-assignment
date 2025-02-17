import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ScoresModule } from './modules/scores/scores.module';
import { ReportsModule } from './modules/reports/reports.module';
import { GlobalExceptionFilterProviders } from './exception-filter/global-exception.providers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ScoresModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService, GlobalExceptionFilterProviders],
})
export class AppModule {}
