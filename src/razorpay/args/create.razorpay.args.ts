import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CreateRazorpayArgs {

    @Field({ nullable: false })
    order_id: string;

    @Field({ nullable: false })
    amount: string;

    @Field({ nullable: false })
    user_id: string;
}
