import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Category } from "src/category/schema/category.schema";

@ObjectType()
export class Ticket {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, { nullable: true })
    title: string;

    @Field((type) => String, { nullable: true })
    priority: string;

    @Field((type) => String, { nullable: true })
    ticket_id: string;

    @Field((type) => String, { nullable: true })
    message: string;

    @Field((type) => String, { nullable: true })
    status: string;

    @Field((type) => String, { nullable: true })
    user_id: string;

    @Field((type) => Category)
    category: Category[];

    @Field((type) => String)
    duration: String;

    @Field((type) => String)
    createdAt: String;
}

