import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from './modules/rabbitmq/rabbitmq.service';

async function bootstrap() {
  const rmqService = new RmqService();
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(rmqService.getOptions());

  await app.startAllMicroservices();

  await app.listen(configService.get('PORT'), () =>
    console.log(
      `Notification Service is running on: ${configService.get('PORT')}`,
    ),
  );
}
bootstrap();
