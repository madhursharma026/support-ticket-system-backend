import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TicketModule } from './ticket/ticket.module';
import { AuthEntity } from './auth/entities/auth.entity';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TicketEntity } from './ticket/entities/ticket.entity';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CategoryEntity } from './category/entities/category.entity';
import { TicketReplyModule } from './ticket-reply/ticket-reply.module';
import { TicketReplyEntity } from './ticket-reply/entities/ticket-reply.entity';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { RazorpayEntity } from './razorpay/entities/razorpay.entity';
import { RazorpayModule } from './razorpay/razorpay.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        // username: 'admin_ticket_support',
        // password: 'Support@123',
        // database: 'admin_ticket_support',
        username: 'root',
        password: '',
        database: 'ticket-support',
        entities: [AuthEntity, TicketEntity, TicketReplyEntity, CategoryEntity, RazorpayEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      introspection: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    AppModule,
    AuthModule,
    TicketModule,
    TicketReplyModule,
    CategoryModule,
    RazorpayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

