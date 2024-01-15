import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Category } from "src/category/schema/category.schema";

@ObjectType()
export class Tags {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, { nullable: true })
    tag_name: string;

    @Field((type) => String, { nullable: true })
    tag_description: string;

    @Field((type) => String)
    createdAt: String;
}

