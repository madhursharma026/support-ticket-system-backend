import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CreateTicketArgs {

    @Field({ nullable: false })
    title: string;

    @Field({ nullable: false })
    priority: string;

    @Field({ nullable: false })
    message: string;

    @Field({ nullable: false })
    user_id: number;

    @Field({ nullable: false })
    category_id: string;
}
