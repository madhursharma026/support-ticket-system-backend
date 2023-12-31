import { InputType, Field, } from "@nestjs/graphql";

@InputType()
export class CreateUserArgs {
    @Field({ nullable: false })
    emailAddress: string;

    @Field({ nullable: false })
    password: string;

    @Field({ nullable: false })
    firstName: string;

    @Field({ nullable: false })
    lastName: string;
}

