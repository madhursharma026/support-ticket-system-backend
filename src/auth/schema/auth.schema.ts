import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Auth {
    @Field((type) => Int)
    id: number;

    @Field((type) => String, {nullable: true})
    emailAddress: string;

    @Field((type) => String, {nullable: true})
    password: string;

    @Field((type) => String, {nullable: true})
    firstName: string;

    @Field((type) => String, {nullable: true})
    lastName: string;

    @Field((type) => String, {nullable: true})
    userPosition: string;

    @Field((type) => String)
    createdAt: String;
}
