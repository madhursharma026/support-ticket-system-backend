import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Category {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, {nullable: false})
    category_name: string;

    @Field((type) => Boolean, {nullable: false})
    category_status: boolean;

    @Field((type) => String)
    createdAt: String;
}

