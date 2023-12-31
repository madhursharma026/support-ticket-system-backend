import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Auth } from "src/auth/schema/auth.schema";
import { Ticket } from "src/ticket/schema/ticket.schema";

@ObjectType()
export class TicketReply {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, {nullable: true})
    message: string;

    // @Field((type) => Int, {nullable: true})
    // ticket_id: number;

    @Field((type) => Ticket)
    ticket: Ticket[];

    // @Field((type) => Int, {nullable: true})
    // replied_by_id: number;

    @Field((type) => Auth)
    replied_by: Auth[];

    @Field((type) => String)
    createdAt: String;
}
