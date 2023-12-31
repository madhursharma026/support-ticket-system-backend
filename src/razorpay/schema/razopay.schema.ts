import { Auth } from "src/auth/schema/auth.schema";
import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Razorpay {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, { nullable: true })
    order_id: string;

    @Field((type) => String, { nullable: true })
    amount: string;

    @Field((type) => Auth)
    user: Auth[];

    @Field((type) => String)
    createdAt: String;
}

