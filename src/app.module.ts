import { Module } from '@nestjs/common';
import { AppGateway } from './gateways/app.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {}
