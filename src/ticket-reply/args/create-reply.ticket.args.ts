import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CreateTicketReplyArgs {
    @Field({ nullable: false })
    message: string;

    @Field({ nullable: false })
    ticket_id: number;

    @Field({ nullable: false })
    replied_by_id: number;
}

