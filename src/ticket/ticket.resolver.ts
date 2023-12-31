import { Ticket } from "./schema/ticket.schema";
import { TicketService } from "./ticket.service";
import { CreateTicketArgs } from "./args/create.ticket.args";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

@Resolver(of => Ticket)
export class TicketResolver {
    constructor(private readonly ticketService: TicketService) { }

    @Mutation(() => Ticket, { name: 'findSingleTicket' })
    findOne(@Args('id', { type: () => Number }) id: number,
        @Args('userId', { type: () => Number }) userId: number) {
        return this.ticketService.findOneById(id, userId);
    }

    @Mutation(() => Ticket, { name: 'adminReadSingleTicket' })
    adminReadSingleTicket(@Args('id', { type: () => Number }) id: number) {
        return this.ticketService.adminReadSingleTicket(id);
    }

    @Mutation(returns => Ticket, { name: 'createTicket' })
    createTicket(@Args('createTicketArgs') createTicketArgs: CreateTicketArgs) {
        return this.ticketService.createTicket(createTicketArgs);
    }

    @Mutation(returns => [Ticket], { name: 'getAllTicketsBySingleUser' })
    getAllTicketsBySingleUser(@Args('userId', { type: () => Number }) userId: number) {
        return this.ticketService.getAllTicketsBySingleUser(userId);
    }

    @Mutation(() => Ticket, { name: 'updateStatusClosed' })
    updateStatusClosed(@Args('ticketId', { type: () => Number }) ticketId: number) {
        return this.ticketService.updateStatusClosed(ticketId);
    }

    @Query(() => [Ticket], { name: 'getAllClosedTicketsBySingleUser' })
    getAllClosedTicketsBySingleUser(@Args('userId', { type: () => Number }) userId: number) {
        return this.ticketService.getAllClosedTicketsBySingleUser(userId);
    }

    @Query(() => [Ticket], { name: 'getAllClosedTickets' })
    getAllClosedTickets(@Args('adminUserId', { type: () => Number }) adminUserId: number) {
        return this.ticketService.getAllClosedTickets(adminUserId);
    }

    @Mutation(returns => [Ticket], { name: 'getAllOpenedTickets' })
    getAllOpenedTickets(@Args('adminUserId', { type: () => Number }) adminUserId: number) {
        return this.ticketService.getAllOpenedTickets(adminUserId);
    }
}
