import { Module } from "@nestjs/common";
import { TicketReplyService } from "./ticket-reply.service";
import { TicketReplyResolver } from "./ticket-reply.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketReplyEntity } from "./entities/ticket-reply.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TicketReplyEntity])],
    controllers: [],
    providers: [TicketReplyService, TicketReplyResolver],
})

export class TicketReplyModule { }
