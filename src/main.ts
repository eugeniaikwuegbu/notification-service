import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RmqService } from './modules/rabbitmq/rabbitmq.service';

async function bootstrap() {
  const rmqService = new RmqService();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    rmqService.getOptions(),
  );

  await app.listen();
}
bootstrap();
