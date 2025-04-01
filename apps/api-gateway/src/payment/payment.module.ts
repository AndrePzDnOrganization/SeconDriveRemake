import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'host.docker.internal',
          port: 5003,
        },
      },
    ]),
  ],
})
export class PaymentModule {}
