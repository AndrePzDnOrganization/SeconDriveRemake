import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'host.docker.internal',
          port: 5002,
        },
      },
    ]),
  ],
  controllers: [],
})
export class AuthModule {}
