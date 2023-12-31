import { Module } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { TicketResolver } from "./ticket.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketEntity } from "./entities/ticket.entity";
import { AuthEntity } from "src/auth/entities/auth.entity";

@Module({
    imports: [TypeOrmModule.forFeature([TicketEntity, AuthEntity])],
    controllers: [],
    providers: [TicketService, TicketResolver],
})

export class TicketModule { }
