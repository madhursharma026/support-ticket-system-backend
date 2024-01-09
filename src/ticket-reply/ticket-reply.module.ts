import { Module } from "@nestjs/common";
import { TicketReplyService } from "./ticket-reply.service";
import { TicketReplyResolver } from "./ticket-reply.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketReplyEntity } from "./entities/ticket-reply.entity";
import { TicketEntity } from "src/ticket/entities/ticket.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TicketReplyEntity, TicketEntity])],
    controllers: [],
    providers: [TicketReplyService, TicketReplyResolver,],
})

export class TicketReplyModule { }
