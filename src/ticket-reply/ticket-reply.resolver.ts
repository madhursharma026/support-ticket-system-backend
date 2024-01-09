import { TicketReply } from "./schema/ticket-reply.schema";
import { TicketReplyService } from "./ticket-reply.service";
import { CreateTicketReplyArgs } from "./args/create-reply.ticket.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => TicketReply)
export class TicketReplyResolver {
    constructor(private readonly ticketService: TicketReplyService) { }

    @Query(() => TicketReply, { name: 'findSingleTicketReply' })
    findOne(@Args('id', { type: () => Number }) id: number) {
        return this.ticketService.findOneById(id);
    }

    @Mutation(returns => TicketReply, { name: 'createTicketReply' })
    createTicketReply(@Args('createTicketReplyArgs') createTicketReplyArgs: CreateTicketReplyArgs) {
        return this.ticketService.createTicketReply(createTicketReplyArgs);
    }

    @Mutation(() => [TicketReply], { name: 'getAllRepliesBySingleTicket' })
    getAllRepliesBySingleTicket(@Args('ticketId', { type: () => Number }) ticketId: number) {
        return this.ticketService.getAllRepliesBySingleTicket(ticketId);
    }
}

